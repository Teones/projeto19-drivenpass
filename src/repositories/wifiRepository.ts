import { prisma } from "../config/database.js";

import { WifiData } from "../services/wifiServices.js";

export async function getAll (userId: number) {
    return prisma.wifiPasswords.findMany({
        where: {
            userId: userId
        }
    })
}

export async function getById (id: number) {
    return prisma.wifiPasswords.findUnique({
        where: {
            id: id
        }
    })
}

export async function getByTitle(title: string, userId: number) {
    return prisma.wifiPasswords.findUnique({
        where: {
            titleByUser: {
                title: title,
                userId: userId
            }
        }
    })
}

export async function create ({title ,name, password}: WifiData, userId: number) {
    return prisma.wifiPasswords.create({
        data: {
            title,
            name,
            password,
            userId
        }
    })
}

export async function deleteWifi (id: number) {
    return prisma.wifiPasswords.delete({
        where: {
            id: id
        }
    })
}