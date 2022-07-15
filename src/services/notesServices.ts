import { SecureNotes } from "@prisma/client";

import * as notesRepository from "../repositories/notesRepository.js"
import * as userRepository from "../repositories/userRepository.js"

export type CreateNotesData = Omit<SecureNotes, "id">;

export async function create(CreateNotesData: CreateNotesData) {
    if(CreateNotesData.title.length > 50) {throw { type: "not_found", message: "title is longer than 50 characters"}};
    if(CreateNotesData.note.length > 1000) {throw { type: "not_found", message: "note is longer than 1000 characters"}};

    const title = await notesRepository.findByTitle(CreateNotesData.title, CreateNotesData.userId);
    if(title) { throw { type: "conflict", message: "Notes must have unique titles" }; };

    const user = await userRepository.findById(CreateNotesData.userId);
    if(!user) { throw { type: "unauthorized", message: "Incorrect credentials" }; };

    const createNote = await notesRepository.createNote(CreateNotesData);
    return createNote;
}