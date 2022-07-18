import { Crecentials } from "@prisma/client";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);

import * as authenticationUtils from "../utils/authenticationUtils.js" 
import * as repository from "../repositories/credentialRepository.js"

export type CreateCredentialData = Omit <Crecentials, "id" | "userId">

export async function create (credential: CreateCredentialData, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const title = await repository.findByTitle(credential.title, authentication.userId);
    if(title) { throw { type: "conflict", message: "credentials must have unique titles" }; };

    const encrypt = cryptr.encrypt(credential.password)
    const decrypt = cryptr.decrypt(encrypt)
    
    const create = await repository.create(credential, encrypt, authentication.userId);

    const tranformArray = [create];
    const createDecrypt = tranformArray.map((credential) => ({
        id: credential.id,
        title: credential.title,
        url: credential.url,
        login: credential.login,
        password: decrypt,
        userId: credential.userId
    }));


    return createDecrypt;
}

export async function getAll (token: string) {
    const authentication = await authenticationUtils.verifyToken(token);
    const credential = await repository.getAll(authentication.userId);

    const object = credential.map((credential) => ({
        id: credential.id,
        title: credential.title,
        url: credential.url,
        login: credential.login,
        password: cryptr.decrypt(credential.password),
        userId: credential.userId
    }));

    return object;
}

export async function getById (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const credential = await repository.getById(id);
    if(!credential) { throw { type: "not_found", message: "credential nonexistent"} };
    if(credential.userId !== authentication.userId) { throw { type: "unauthorized", message: "credential belongs to another user" }; };
 
    const array = [credential]
    const object = array.map((credential) => ({
        id: credential.id,
        title: credential.title,
        url: credential.url,
        login: credential.login,
        password: cryptr.decrypt(credential.password),
        userId: credential.userId
    }));

    return object[0];
}

export async function deleteCredential (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const credential = await repository.getById(id);
    if(!credential) { throw { type: "not_found", message: "credential nonexistent"} };
    if(credential.userId !== authentication.userId) { throw { type: "unauthorized", message: "credential belongs to another user" }; };
 
    const deleteCredential = await repository.deleteCredential(id)

    return deleteCredential;
}