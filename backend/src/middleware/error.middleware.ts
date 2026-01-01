// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isProd = process.env.NODE_ENV === "production";
  const statusCode = err instanceof ApiError ? err.status : 500;
  const isSuccess = err instanceof ApiError ? err.success : false;

  if (err instanceof ApiError) {
    if (err.name === "BadRequestError") {
      if (err.details) {
        return res.status(statusCode).json({
          success: isSuccess,
          message: isProd ? "Internal server error" : err.message,
          fields: err.details,
        });
      } else {
        return res.status(statusCode).json({
          success: isSuccess,
          message: isProd ? "Internal server error" : err.message,
        });
      }
    }
  }

  return res.status(statusCode).json({
    success: isSuccess,
    message: isProd ? "Internal server error" : err.message,
  });
};
