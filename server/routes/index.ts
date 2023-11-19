import PromiseRouter from "express-promise-router";
import { passphrasesRouter } from "./passphrases";

const apiRouter = PromiseRouter();

apiRouter.use("/passphrases", passphrasesRouter);

export { apiRouter };
