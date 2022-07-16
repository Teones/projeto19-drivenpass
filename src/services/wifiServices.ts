import { WifiPasswords } from "@prisma/client";

export type WifiData = Omit <WifiPasswords, "id" | "userId">

import * as authenticationUtils from "../utils/authenticationUtils.js"
import * as repository from "../repositories/wifiRepository.js"

export async function create(wifi: WifiData, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const title = await repository.getByTitle(wifi.title, authentication.userId);
    if(title) { throw { type: "conflict", message: "Wifi must have unique titles" }; };

    // espaço reservado para fazer o cryptr da senha e código de segurança

    const create = await repository.create(wifi, authentication.userId);

    return create;
}

export async function getAll (token: string) {
    const authentication = await authenticationUtils.verifyToken(token);
    const wifi = await repository.getAll(authentication.userId);

    // descriptografar senha e código de segurança e mapear return

    return wifi
}

export async function getById (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const wifi = await repository.getById(id);
    if(!wifi) { throw { type: "not_found", message: "wifi nonexistent"} };
    if(wifi.userId !== authentication.userId) { throw { type: "unauthorized", message: "wifi belongs to another user" }; };
 
    // descriptografar senha e código de segurança e mapear return

    return wifi;
}

export async function deleteWifi (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const wifi = await repository.getById(id);
    if(!wifi) { throw { type: "not_found", message: "wifi nonexistent"} };
    if(wifi.userId !== authentication.userId) { throw { type: "unauthorized", message: "wifi belongs to another user" }; };
 
    const deleteWifi = await repository.deleteWifi(id)

    return deleteWifi;
}