import PromiseRouter from "express-promise-router";
import { authenticateRefreshToken } from "../middleware";
import { authController } from "../controllers";

export const authRouter = PromiseRouter();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post(
  "/verify",
  authenticateRefreshToken,
  authController.verifyPassword
);
