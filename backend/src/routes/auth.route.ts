import { Router } from "express";
import validate from "../middleware/validate.middleware";
import { AuthController } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { isAuthenticated } from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

// private route
router.post("/logout", isAuthenticated, AuthController.logout);
router.get("/me", isAuthenticated, AuthController.me);

router.post("/refresh-token", AuthController.refresh);

export default router;
