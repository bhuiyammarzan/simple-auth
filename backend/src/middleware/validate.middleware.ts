import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { ApiError, BadRequestError } from "../utils/ApiError";

export const validate = (schema: z.ZodSchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        throw new BadRequestError("Validation failed", errorMessages);
      }

      throw new ApiError("Internal server error during validation");
    }
  };
};

export default validate;
