import { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/userRepository.js";

export type CreateUserData = Omit<Users, "id">;

export async function signUp (createUserData: CreateUserData) {
    const user = await userRepository.findByEmail(createUserData.email);
    if(user) { throw { type: "conflict", message: "Users must have unique emails" }; };
    
    const passwordEncrypt = bcrypt.hashSync(createUserData.password, 12);
    
    const createuser = await userRepository.insert(createUserData.email, passwordEncrypt);
    return createuser;
}

export async function login (createUserData: CreateUserData) {
    const user = await userRepository.findByEmail(createUserData.email);
    if(!user) { throw { type: "unauthorized", message: "Incorrect credentials" }; };
    
    const authorization = bcrypt.compareSync(createUserData.password, user.password);
    if (!authorization) { throw { type: "unauthorized", message: "Incorrect credentials" }; };
    
    const userId = user.id
    const token = jwt.sign({userId}, process.env.JWT_SECRET)

    return token
}