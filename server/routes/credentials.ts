import PromiseRouter from "express-promise-router";
import {
  authenticateAccessToken,
  authenticateRefreshToken,
} from "../middleware";
import { credentialsController } from "../controllers";

export const credentialsRouter = PromiseRouter();

credentialsRouter.get(
  "/",
  authenticateRefreshToken,
  credentialsController.getFields
);
credentialsRouter.get(
  "/:credentialsId",
  authenticateAccessToken,
  credentialsController.getPassword
);
credentialsRouter.post(
  "/",
  authenticateAccessToken,
  credentialsController.postCredentials
);
credentialsRouter.put(
  "/:credentialsId",
  authenticateAccessToken,
  credentialsController.updatePassword
);
credentialsRouter.delete(
  "/:credentialsId",
  authenticateAccessToken,
  credentialsController.deleteCredentials
);
