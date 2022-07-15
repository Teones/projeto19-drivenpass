import { prisma } from "../config/database.js";

import { CreateNotesData } from "../services/notesServices.js";

export async function findAll (id: number) {
    return prisma.secureNotes.findMany({
        where: {
            userId: id
        }
    })
}

export async function findById (id: number) {
    return prisma.secureNotes.findUnique({
        where: {
            id: id
        }
    })
}

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

export async function deleteNote (id: number) {
    return prisma.secureNotes.delete({
        where: {
            id: id
        }
    })
}