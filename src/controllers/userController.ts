import { Request, Response } from "express";

import * as userServices from "../services/userService.js"
import { CreateUserData } from "../services/userService.js";

export async function create(req: Request, res: Response) {
    const user: CreateUserData = req.body;
    if(!user.email || !user.password) { throw { type: "not_found" } };
    
    const signUp = await userServices.signUp(user);

    return res.status(201).send(signUp);
}

export async function login(req: Request, res: Response) {
    const user: CreateUserData = req.body;
    if(!user.email || !user.password) { throw { type: "not_found" } };

    const login = await userServices.login(user);

    return res.status(201).send(login);
}