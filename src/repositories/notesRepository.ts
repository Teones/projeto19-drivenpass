import { prisma } from "../config/database.js";

import { CreateNotesData } from "../services/notesServices.js";

export async function findByTitle (title: string, userId: number) {
    return prisma.secureNotes.findUnique({
        where: {
            titleByUser: {
                title: title,
                userId: userId
            }
        }
    })
}

export async function createNote ({title, note, userId}: CreateNotesData) {
    return prisma.secureNotes.create({
        data: {
            title: title,
            note: note,
            userId: userId
        }
    })
}