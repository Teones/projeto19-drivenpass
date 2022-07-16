import { Router } from "express";

import userRouter from "./userRouter.js";
import notesRouter from "./notesRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import cardRouter from "./cardsRouter.js";
import wifiRouter from "./wifiRouter.js";

const router = Router();
router.use(userRouter);
router.use(notesRouter);
router.use(credentialsRouter);
router.use(cardRouter);
router.use(wifiRouter);

export default router;