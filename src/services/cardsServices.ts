import { Cards } from "@prisma/client";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);

import * as authenticationUtils from "../utils/authenticationUtils.js"
import * as repository from "../repositories/cardsRepository.js"

export type CardsData = Omit <Cards, "id" | "userId">

export async function create(card: CardsData, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const title = await repository.getByTitle(card.title, authentication.userId);
    if(title) { throw { type: "conflict", message: "Cards must have unique titles" }; };

    const encryptCVC = cryptr.encrypt(card.securityCode);
    const encryptPassword = cryptr.encrypt(card.password);

    const decryptCVC = cryptr.decrypt(encryptCVC);
    const decryptPassword = cryptr.decrypt(encryptPassword);

    const create = await repository.create(card, encryptCVC, encryptPassword, authentication.userId);

    const tranformArray = [create];
    const createDecrypt = tranformArray.map((card) => ({
        id: card.id,
        cardNumber: card.cardNumber,
        cardHolderName: card.cardholderName,
        password: decryptPassword,
        securityCode: decryptCVC,
        isVirtual: card.isVirtual,
        cardType: card.cardType,
        flag: card.flag
    }));

    return createDecrypt[0];
}

export async function getAll (token: string) {
    const authentication = await authenticationUtils.verifyToken(token);
    const card = await repository.getAll(authentication.userId);

    const object = card.map((card) => ({
        id: card.id,
        cardNumber: card.cardNumber,
        cardHolderName: card.cardholderName,
        password: cryptr.decrypt(card.password),
        securityCode: cryptr.decrypt(card.securityCode),
        isVirtual: card.isVirtual,
        cardType: card.cardType,
        flag: card.flag
    }));

    return object;
}

export async function getById (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const card = await repository.getById(id);
    if(!card) { throw { type: "not_found", message: "card nonexistent"} };
    if(card.userId !== authentication.userId) { throw { type: "unauthorized", message: "card belongs to another user" }; };
 
    const array = [card]
    const object = array.map((card) => ({
        id: card.id,
        cardNumber: card.cardNumber,
        cardHolderName: card.cardholderName,
        password: cryptr.decrypt(card.password),
        securityCode: cryptr.decrypt(card.securityCode),
        isVirtual: card.isVirtual,
        cardType: card.cardType,
        flag: card.flag
    }));

    return object;
}

export async function deleteCard (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const card = await repository.getById(id);
    if(!card) { throw { type: "not_found", message: "card nonexistent"} };
    if(card.userId !== authentication.userId) { throw { type: "unauthorized", message: "card belongs to another user" }; };
 
    const deleteCard = await repository.deleteCard(id)

    return deleteCard;
}