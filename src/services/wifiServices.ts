import { WifiPasswords } from "@prisma/client";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);

import * as authenticationUtils from "../utils/authenticationUtils.js"
import * as repository from "../repositories/wifiRepository.js"

export type WifiData = Omit <WifiPasswords, "id" | "userId">

export async function create(wifi: WifiData, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const title = await repository.getByTitle(wifi.title, authentication.userId);
    if(title) { throw { type: "conflict", message: "Wifi must have unique titles" }; };

    const encrypt = cryptr.encrypt(wifi.password)
    const decrypt = cryptr.decrypt(encrypt)

    const create = await repository.create(wifi, encrypt, authentication.userId);

    const tranformArray = [create];
    const createDecrypt = tranformArray.map((wifi) => ({
        id: wifi.id,
        title: wifi.title,
        name: wifi.name,
        password: decrypt,
        userId: wifi.userId

    }));

    return createDecrypt[0];
}

export async function getAll (token: string) {
    const authentication = await authenticationUtils.verifyToken(token);
    const wifi = await repository.getAll(authentication.userId);

    const object = wifi.map((wifi) => ({
        id: wifi.id,
        title: wifi.title,
        name: wifi.name,
        password: cryptr.decrypt(wifi.password),
        userId: wifi.userId
    }));

    return object;
}

export async function getById (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const wifi = await repository.getById(id);
    if(!wifi) { throw { type: "not_found", message: "wifi nonexistent"} };
    if(wifi.userId !== authentication.userId) { throw { type: "unauthorized", message: "wifi belongs to another user" }; };
 
    const array = [wifi]
    const object = array.map((wifi) => ({
        id: wifi.id,
        title: wifi.title,
        name: wifi.name,
        password: cryptr.decrypt(wifi.password),
        userId: wifi.userId
    }));

    return object[0];
}

export async function deleteWifi (id: number, token: string) {
    const authentication = await authenticationUtils.verifyToken(token);

    const wifi = await repository.getById(id);
    if(!wifi) { throw { type: "not_found", message: "wifi nonexistent"} };
    if(wifi.userId !== authentication.userId) { throw { type: "unauthorized", message: "wifi belongs to another user" }; };
 
    const deleteWifi = await repository.deleteWifi(id);

    return deleteWifi;
}