import { SecureNotes } from "@prisma/client";

import * as notesRepository from "../repositories/notesRepository.js"
import * as userRepository from "../repositories/userRepository.js"
import * as authenticationUtils from "../utils/authenticationUtils.js" 

export type CreateNotesData = Omit<SecureNotes, "id">;

export async function create(CreateNotesData: CreateNotesData, token: string) {
    await authenticationUtils.verifyToken(token)

    if(CreateNotesData.title.length > 50) {throw { type: "not_found", message: "title is longer than 50 characters"}};
    if(CreateNotesData.note.length > 1000) {throw { type: "not_found", message: "note is longer than 1000 characters"}};

    const title = await notesRepository.findByTitle(CreateNotesData.title, CreateNotesData.userId);
    if(title) { throw { type: "conflict", message: "Notes must have unique titles" }; };

    const user = await userRepository.findById(CreateNotesData.userId);
    if(!user) { throw { type: "unauthorized", message: "Incorrect credentials" }; };

    const createNote = await notesRepository.createNote(CreateNotesData);
    return createNote;
}

export async function getNotesById (noteId: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const notes = await notesRepository.findById(noteId);
    if(!notes) { throw { type: "not_found", message: "note nonexistent"} };
    if(notes.userId !== authentication.userId) { throw { type: "unauthorized", message: "note belongs to another user" }; }
    
    return notes;
}

export async function getnotesAll (token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const notes = await notesRepository.findAll(authentication.userId);

    return notes;
}

export async function deleteNote (noteId: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const notes = await notesRepository.findById(noteId);
    if(!notes) { throw { type: "not_found", message: "note nonexistent"} };
    if(notes.userId !== authentication.userId) { throw { type: "unauthorized", message: "note belongs to another user" }; }
    
    const deleteNote = await notesRepository.deleteNote(noteId);

    return deleteNote
}