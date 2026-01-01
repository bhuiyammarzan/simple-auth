import { Request, Response } from "express";
import {
  ApiError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { RegisterInput } from "../schemas/auth.schema";
import { User } from "../model/user.model";

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

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { user: { name: newUser.name, email: newUser.email } },
            "Registration successfull"
          )
        );
    } catch (error) {
      console.log("Something went wrong register api", error);
      throw new ApiError("Something went wrong register api");
    }
  }

  static async login(req: Request, res: Response): Promise<void> {}
}
