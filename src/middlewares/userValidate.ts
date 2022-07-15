import { NextFunction, Request, Response } from "express";

import signUpSchema from "../schemas/signUpSchema.js";

export function validateUser (req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    const {error} = signUpSchema.validate(user, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};