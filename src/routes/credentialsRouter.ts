import { Router } from "express";

import * as validations from "../middlewares/credentialValidate.js"
import * as controllers from "../controllers/credentialsController.js"

const credentialsRouter = Router();
credentialsRouter.post("/credentials", validations.validateCredential, controllers.create);
credentialsRouter.get("/credentials", controllers.get);
credentialsRouter.delete("/credentials/:id", controllers.deleteCredential)

export default credentialsRouter;