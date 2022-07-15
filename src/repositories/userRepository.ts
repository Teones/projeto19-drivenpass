import { prisma } from "../config/database.js";

export async function findById (id: number) {
    return prisma.users.findUnique({
        where: {
            id: id
        }
    })
}

export async function findByEmail(email: string) {
    return prisma.users.findUnique({
        where: {
            email: email
        }
    })
}

export async function insert(email: string, password: string) {
    return prisma.users.create({
        data: {
            email: email,
            password: password
        }
    })
}