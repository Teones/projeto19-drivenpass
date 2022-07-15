import { Router } from "express";

import * as notesController from "../controllers/notesController.js"
import * as notesMiddlewares from "../middlewares/notesValidate.js"

const notesRouter = Router();
notesRouter.post("/notes", notesMiddlewares.validateNote, notesController.create);
notesRouter.get("/notes", notesController.getNotes);
notesRouter.delete("/notes/:id", notesController.deleteNote);

export default notesRouter;