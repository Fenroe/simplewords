import PromiseRouter from "express-promise-router";
import { authRouter } from "./auth";
import { credentialsRouter } from "./credentials";

const apiRouter = PromiseRouter();

apiRouter.use("/auth", authRouter);
apiRouter.use("/credentials", credentialsRouter);

export { apiRouter };
