import { Request, Response } from "express";
import {
  ApiError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/ApiError";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    throw new ForbiddenError("request error controller");
  }
}
