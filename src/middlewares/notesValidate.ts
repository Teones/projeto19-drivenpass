import { NextFunction, Request, Response } from "express";

import notesSchema from "../schemas/notesSchema.js";

export function validateNote (req: Request, res: Response, next: NextFunction) {
    const noteData = req.body;
    const {error} = notesSchema.validate(noteData, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};