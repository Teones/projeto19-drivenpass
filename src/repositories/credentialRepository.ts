import { prisma } from "../config/database.js";

import { CreateCredentialData } from "../services/credentialsServices.js";

export async function getAll (userId: number) {
    return prisma.crecentials.findMany({
        where: {
            userId: userId
        }
    })
}

export async function getById (id: number) {
    return prisma.crecentials.findUnique({
        where: {
            id: id
        }
    })
}

export async function findByTitle (title: string, userId: number) {
    return prisma.crecentials.findUnique({
        where: {
            titleByUser: {
                title: title,
                userId: userId
            }
        }
    })
}

export async function create ({title, url, login}: CreateCredentialData, password: string, userId: number) {
    return prisma.crecentials.create({
        data: {
            title: title,
            url: url,
            login: login,
            password: password,
            userId: userId
        }
    })
}

export async function deleteCredential (id: number) {
    return prisma.crecentials.delete({
        where: {
            id: id
        }
    })
}