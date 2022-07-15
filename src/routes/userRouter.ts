import { Router } from "express";

import * as userController from "../controllers/userController.js"
import * as userMiddlewares from "../middlewares/userValidate.js"

const userRouter = Router();
userRouter.post("/sign-up", userMiddlewares.validateUser, userController.create);
userRouter.post("/sign-in", userMiddlewares.validateUser, userController.login);

export default userRouter;