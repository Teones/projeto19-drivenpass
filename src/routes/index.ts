import { Router } from "express";

import userRouter from "./userRouter.js";
import notesRouter from "./notesRouter.js";
import credentialsRouter from "./credentialsRouter.js";

const router = Router();
router.use(userRouter);
router.use(notesRouter);
router.use(credentialsRouter);

export default router;