import { Request, Response } from "express";

import * as notesServices from "../services/notesServices.js"
import { CreateNotesData } from "../services/notesServices";

export async function create (req: Request, res: Response) {
    const token = req.headers["token"] as string
    
    const note: CreateNotesData = req.body;
    if(!note.title || !note.note || !note.userId) { throw { type: "not_found" } };
    if(typeof(note.userId) === "string") { throw { type: "not_found" } };

    const create = await notesServices.create(note, token)

    return res.status(201).send(create);
}

export async function getNotes (req: Request, res: Response) {
    const token = req.headers["token"] as string
    const noteId = req.query.id
    
    if(!noteId) {
        const notes = await notesServices.getnotesAll(token)
        return res.status(200).send(notes);
    }

    const notes = await notesServices.getNotesById(Number(noteId), token);

    return res.status(200).send(notes);
}

export async function deleteNote (req: Request, res: Response) {
    const token = req.headers["token"] as string
    
    const noteId = req.params.id;
    if(!noteId) { throw { type: "not_found" } }

    const deleteNote = await notesServices.deleteNote(Number(noteId), token)

    return res.status(200).send(deleteNote);
}