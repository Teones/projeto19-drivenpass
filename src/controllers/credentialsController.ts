import { Request, Response } from "express";

import * as services from "../services/credentialsServices.js"

import { CreateCredentialData } from "../services/credentialsServices.js";

export async function create (req: Request, res: Response) {
    const token = req.headers["token"] as string;
    const credential: CreateCredentialData = req.body;

    const create = await services.create(credential, token);

    return res.status(201).send(create);
}

export async function get (req: Request, res: Response) {
    const token = req.headers["token"] as string;
    const id = req.query.id;

    if(!id) {
        const credential = await services.getAll(token);
        return res.status(200).send(credential);
    }

    const credential = await services.getById(Number(id), token);

    return res.status(200).send(credential);
}

export async function deleteCredential (req: Request, res: Response) {
    const token = req.headers["token"] as string;

    const id = req.params.id;
    if(!id) { throw { type: "not_found" } };

    const deleteCredential = await services.deleteCredential(Number(id), token);

    return res.status(200).send(deleteCredential);
}