import { NextFunction, Request, Response } from "express";

import cardsSchema from "../schemas/cardsSchema.js";

export function validateCards (req: Request, res: Response, next: NextFunction) {
    const cardData = req.body;
    const {error} = cardsSchema.validate(cardData, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};