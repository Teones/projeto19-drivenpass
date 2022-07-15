// import { User } from "@prisma/client";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js";

export async function signUp (email: string, password: string) {
    const existingEmail = await userRepository.findByEmail(email)
    console.log(existingEmail)
    if(existingEmail) { throw { type: "conflict", message: "Users must have unique emails" }; };
    
    const passwordEncrypt = bcrypt.hashSync(password, 12);
    
    const createuser = await userRepository.insert(email, passwordEncrypt);
    return createuser;
}

function findByEmail(email: string) {
    return userRepository.findByEmail(email)
}