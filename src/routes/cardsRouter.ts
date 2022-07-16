import { Router } from "express";

import * as controller from "../controllers/cardsControllers.js"
import * as validations from "../middlewares/cardsValidate.js"

const cardRouter = Router();
cardRouter.post("/cards", validations.validateCards, controller.create);
cardRouter.get("/cards", controller.get);
cardRouter.delete("/cards/:id", controller.deleteCard)

export default cardRouter;