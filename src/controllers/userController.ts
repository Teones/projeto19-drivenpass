import { Request, Response } from "express";

import * as userServices from "../services/userService.js"

export async function create(req: Request, res: Response) {
    const {email, password} = req.body;
    if(!email || !password) { throw { type: "not_found" } };
    
    const signUp = await userServices.signUp(email, password);

    return res.status(201).send(signUp);
}

export async function login(req: Request, res: Response) {
    const {email, password} = req.body;
    if(!email || !password) { throw { type: "not_found" } };

    const login = await userServices.login(email, password);

    return res.status(201).send(login);
}