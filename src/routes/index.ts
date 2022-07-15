import { Router } from "express";

import userRouter from "./userRouter.js";
import notesRouter from "./notesRouter.js";

const router = Router();
router.use(userRouter)
router.use(notesRouter)

export default router;