import { NextFunction, Request, Response } from "express";

import wifiSchema from "../schemas/wifiSchema.js";

export function validateWifi (req: Request, res: Response, next: NextFunction) {
    const wifiData = req.body;
    const {error} = wifiSchema.validate(wifiData, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};