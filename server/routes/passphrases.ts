import PromiseRouter from "express-promise-router";
import { passphraseController } from "../controllers";

const passphrasesRouter = PromiseRouter();

passphrasesRouter.get("/description", passphraseController.getPassphraseWithDescription);

export {
    passphrasesRouter
}
