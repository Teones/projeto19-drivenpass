import { Cards } from "@prisma/client";

import * as authenticationUtils from "../utils/authenticationUtils.js"
import * as repository from "../repositories/cardsRepository.js"

export type CardsData = Omit <Cards, "id" | "userId">

export async function create(card: CardsData, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const title = await repository.getByTitle(card.title, authentication.userId);
    if(title) { throw { type: "conflict", message: "Cards must have unique titles" }; };

    // espaço reservado para fazer o cryptr da senha e código de segurança

    const create = await repository.create(card, authentication.userId);

    return create;
}

export async function getAll (token: string) {
    const authentication = await authenticationUtils.verifyToken(token);
    const card = await repository.getAll(authentication.userId);

    // descriptografar senha e código de segurança e mapear return

    return card
}

export async function getById (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const card = await repository.getById(id);
    if(!card) { throw { type: "not_found", message: "card nonexistent"} };
    if(card.userId !== authentication.userId) { throw { type: "unauthorized", message: "card belongs to another user" }; };
 
    // descriptografar senha e código de segurança e mapear return

    return card;
}

export async function deleteCard (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const card = await repository.getById(id);
    if(!card) { throw { type: "not_found", message: "card nonexistent"} };
    if(card.userId !== authentication.userId) { throw { type: "unauthorized", message: "card belongs to another user" }; };
 
    const deleteCard = await repository.deleteCard(id)

    return deleteCard;
}