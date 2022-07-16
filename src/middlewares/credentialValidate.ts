import { NextFunction, Request, Response } from "express";

import credentialSchema from "../schemas/credentialSchema.js";

export function validateCredential (req: Request, res: Response, next: NextFunction) {
    const credentialData = req.body;
    const {error} = credentialSchema.validate(credentialData, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};