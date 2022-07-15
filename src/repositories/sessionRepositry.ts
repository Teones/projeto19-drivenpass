import { prisma } from "../config/database.js";

export async function insert (token: string, userId: number) {
    return prisma.sessions.create({
        data: {
            token: token,
            userId: userId
        }
    })
}