import { Router } from "express";

import * as validations from "../middlewares/wifiValidate.js"
import * as controllers from "../controllers/wifiController.js"

const wifiRouter = Router();
wifiRouter.post("/wifi", validations.validateWifi, controllers.create);
wifiRouter.get("/wifi", controllers.get);
wifiRouter.delete("/wifi/:id", controllers.deleteWifi);

export default wifiRouter;