import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/userRepository.js";

export async function signUp (email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if(user) { throw { type: "conflict", message: "Users must have unique emails" }; };
    
    const passwordEncrypt = bcrypt.hashSync(password, 12);
    
    const createuser = await userRepository.insert(email, passwordEncrypt);
    return createuser;
}


export async function login (email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if(!user) { throw { type: "unauthorized", message: "Incorrect credentials" }; };
    
    const authorization = bcrypt.compareSync(password, user.password);
    if (!authorization) { throw { type: "unauthorized", message: "Incorrect credentials" }; };
    
    const userId = user.id
    const token = jwt.sign({userId}, process.env.JWT_SECRET)

    return token
}