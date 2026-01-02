import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import { errorHandler } from "./middleware/error.middleware";
import cors from "cors";

const app = express();

const initializeApp = async () => {
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));

  app.use(cookieParser());

  app.use(
    cors({
      origin: process.env.FRONTEND_URL, // frontend URL
      credentials: true, // ✅ required
    })
  );

  app.use("/api/auth", authRouter);

  app.use(errorHandler);
  return app;
};

export default initializeApp;
