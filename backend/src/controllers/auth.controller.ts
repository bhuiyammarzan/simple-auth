import type { Request, Response } from "express";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { ApiError, BadRequestError, NotFoundError } from "../utils/ApiError";
import { User } from "../model/user.model";
import { ApiResponse } from "../utils/ApiResponse";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body as RegisterInput;

    if ([name, email, password].some((field) => field.trim() == "")) {
      throw new BadRequestError("All filed are requried");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    try {
      const newUser = await User.create({ email, name, password });

      res.status(200).json(
        new ApiResponse(
          200,
          {
            user: {
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
            },
          },
          "Registration successfull"
        )
      );
    } catch (error) {
      console.log("Something went wrong register api", error);
      throw new ApiError("Something went wrong register api");
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as LoginInput;

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("User not exists");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new BadRequestError("Invalid user credientials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    if (!accessToken || !refreshToken) {
      throw new ApiError("Something went wrong to gererate token");
    }

    try {
      user.refreshToken = refreshToken;
      await user.save();

      const options = {
        httpOnly: true,
        secure: true,
      };

      res
        .cookie("refreshToken", refreshToken, options)
        .status(200)
        .json(
          new ApiResponse(
            200,
            {
              token: accessToken,
              user: { name: user.name, email: user.email, role: user.role },
            },
            "Login successfull"
          )
        );
    } catch (error: any) {
      throw new ApiError(error.message);
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    const payload = req.user;
    if (!payload?.id) {
      throw new ApiError("Something went wrong with logout handler");
    }

    const tokenFromCookie = req.cookies?.refreshToken;

    const user = await User.findById(payload.id);

    if (!user) {
      throw new NotFoundError("User not found!");
    }

    if (!user.refreshToken && !tokenFromCookie) {
      throw new BadRequestError("User already logout");
    }
    try {
      await User.findByIdAndUpdate(
        payload.id,
        {
          $unset: {
            refreshToken: 1, // this removes the field from document
          },
        },
        {
          new: true,
        }
      );

      const options = {
        httpOnly: true,
        secure: true,
      };
      res
        .status(200)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Logout successfull"));
    } catch (error) {
      console.log("Something went wrong with logout handler", error);
      throw new ApiError("Something went wrong with logout handler");
    }
  }
}
