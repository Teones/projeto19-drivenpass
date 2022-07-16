import { prisma } from "../config/database.js";

import { CardsData } from "../services/cardsServices.js";

export async function getAll (userId: number) {
    return prisma.cards.findMany({
        where: {
            userId: userId
        }
    })
}

export async function getById (id: number) {
    return prisma.cards.findUnique({
        where: {
            id: id
        }
    })
}

export async function getByTitle(title: string, userId: number) {
    return prisma.cards.findUnique({
        where: {
            titleByUser: {
                title: title,
                userId: userId
            }
        }
    })
}

export async function create ({
    title ,cardNumber, cardType, cardholderName, flag, isVirtual, securityCode}: CardsData,
    userId: number) {
    return prisma.cards.create({
        data: {
            title,
            cardNumber,
            cardholderName,
            cardType, 
            flag,
            isVirtual,
            securityCode,
            userId
        }
    })
}

export async function deleteCard (id: number) {
    return prisma.cards.delete({
        where: {
            id: id
        }
    })
}