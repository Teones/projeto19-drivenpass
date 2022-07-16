import { Request, Response } from "express";

import * as services from "../services/cardsServices.js"
import { CardsData } from "../services/cardsServices.js";

export async function create (req: Request, res: Response) {
    const token = req.headers["token"] as string;
    const card: CardsData = req.body;

    const create = await services.create(card, token)

    return res.status(201).send(create);
}

export async function get (req: Request, res: Response) {
    const token = req.headers["token"] as string;
    const id = req.query.id;

    if(!id) {
        const card = await services.getAll(token);
        return res.status(200).send(card);
    }

    const card = await services.getById(Number(id), token)

    return res.status(200).send(card);
}

export async function deleteCard (req: Request, res: Response) {
    const token = req.headers["token"] as string;

    const id = req.params.id;
    if(!id) { throw { type: "not_found" } };

    const deleteCard = await services.deleteCard(Number(id), token);

    return res.status(200).send(deleteCard);    
}