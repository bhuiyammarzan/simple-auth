import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { IUser } from "../model/user.model";
import { ApiError, UnauthorizedError } from "./ApiError";

export const generateAccessToken = (user: IUser): string => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new ApiError("JWT_ACCESS_TOKEN_SECRET is not configured");
  }

  const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRY;
  const options = expiresIn ? ({ expiresIn } as jwt.SignOptions) : {};

  return jwt.sign({ sub: user._id, email: user.email }, secret, options);
};

export const generateRefreshToken = (user: IUser): string => {
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw new ApiError("JWT_REFRESH_TOKEN_SECRET is not configured");
  }

  const expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRY;
  const options = expiresIn ? ({ expiresIn } as jwt.SignOptions) : {};

  return jwt.sign({ sub: user._id }, secret, options);
};

export const verifyAccessToken = (token: string): string | JwtPayload => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new ApiError("JWT_ACCESS_TOKEN_SECRET is not configured");
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedError("Access token expired");
      }

      if (error.name === "JsonWebTokenError") {
        throw new UnauthorizedError("Invalid access token");
      }

      if (error.name === "NotBeforeError") {
        throw new UnauthorizedError("Token not active yet");
      }
    }

    throw new ApiError("Authentication failed");
  }
};

export const verifyRefreshToken = (token: string): string | JwtPayload => {
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw new ApiError("JWT_REFRESH_TOKEN_SECRET is not configured");
  }

  return jwt.verify(token, secret) as { sub: string };
};
