import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/register", AuthController.register);

export default router;
