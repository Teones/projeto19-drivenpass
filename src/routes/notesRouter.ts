import { Router } from "express";

import * as notesController from "../controllers/notesController.js"
import * as notesMiddlewares from "../middlewares/notesValidate.js"

const notesRouter = Router();
notesRouter.post("/notes", notesMiddlewares.validateUser, notesController.create);
// userRouter.post("/sign-in", userMiddlewares.validateUser, userController.login);

export default notesRouter;