import { Request, Response } from "express";

import * as services from "../services/wifiServices.js";
import { WifiData } from "../services/wifiServices.js";

export async function create (req: Request, res: Response) {
    const token = req.headers["token"] as string;
    const wifi: WifiData = req.body;

    const create = await services.create(wifi, token);

    return res.status(201).send(create);
}

export async function get (req: Request, res: Response) {
    const token = req.headers["token"] as string;
    const id = req.query.id;

    if(!id) {
        const wifi = await services.getAll(token);
        return res.status(200).send(wifi);
    };

    const wifi = await services.getById(Number(id), token);

    return res.status(200).send(wifi);
}

export async function deleteWifi (req: Request, res: Response) {
    const token = req.headers["token"] as string;

    const id = req.params.id;
    if(!id) { throw { type: "not_found" } };

    const deleteWifi = await services.deleteWifi(Number(id), token);

    return res.status(200).send(deleteWifi);    
}