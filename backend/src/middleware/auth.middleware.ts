import { verifyAccessToken } from "../utils/token";
import { User } from "../model/user.model";
import type { NextFunction, Request, Response } from "express";
import { NotFoundError, UnauthorizedError } from "../utils/ApiError";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError(
      "No token provided. Please provide a Bearer token."
    );
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    throw new UnauthorizedError("Invalid or expired access token");
  }
  const user = await User.findById(decoded.sub);
  if (!user) {
    throw new NotFoundError("User doen't exists!");
  }

  req.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    // isEmailVerified: user.isEmailVerified,
  };

  next();
};
