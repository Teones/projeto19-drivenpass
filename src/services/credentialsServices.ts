// import cryptr from "cryptr"
import { Crecentials } from "@prisma/client";

import * as authenticationUtils from "../utils/authenticationUtils.js" 
import * as repository from "../repositories/credentialRepository.js"

export type CreateCredentialData = Omit <Crecentials, "id" | "userId">

export async function create (credential: CreateCredentialData, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const title = await repository.findByTitle(credential.title, authentication.userId);
    if(title) { throw { type: "conflict", message: "credentials must have unique titles" }; };

    // espaço reservado para fazer o cryptr da senha

    const create = await repository.create(credential, authentication.userId);

    return create;
}

export async function getAll (token: string) {
    const authentication = await authenticationUtils.verifyToken(token);
    const credential = await repository.getAll(authentication.userId);

    // descriptografar senha e mapear return

    return credential
}

export async function getById (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const credential = await repository.getById(id);
    if(!credential) { throw { type: "not_found", message: "credential nonexistent"} };
    if(credential.userId !== authentication.userId) { throw { type: "unauthorized", message: "credential belongs to another user" }; };
 
    // descriptografar senha e mapear return

    return credential;
}

export async function deleteCredential (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const credential = await repository.getById(id);
    if(!credential) { throw { type: "not_found", message: "credential nonexistent"} };
    if(credential.userId !== authentication.userId) { throw { type: "unauthorized", message: "credential belongs to another user" }; };
 
    const deleteCredential = await repository.deleteCredential(id)

    return deleteCredential;
}