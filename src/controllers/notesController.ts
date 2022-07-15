import { Request, Response } from "express";

import * as notesServices from "../services/notesServices.js"
import { CreateNotesData } from "../services/notesServices";

export async function create (req: Request, res: Response) {
    const note: CreateNotesData = req.body;
    if(!note.title || !note.note || !note.userId) { throw { type: "not_found" } };
    if(typeof(note.userId) === "string") { throw { type: "not_found" } };
    
    const create = await notesServices.create(note)

    return res.status(201).send(create);
}