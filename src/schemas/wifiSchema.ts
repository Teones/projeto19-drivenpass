import Joi from "joi";

import { WifiData } from "../services/wifiServices.js";

const wifiSchema = Joi.object<WifiData>({
    title: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
});

export default wifiSchema;