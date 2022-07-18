import Joi from "joi";

import { CardsData } from "../services/cardsServices.js";
import { CardType } from "@prisma/client";
import { CardFlag } from "@prisma/client";

const cardsSchema = Joi.object<CardsData>({
    title: Joi.string().required(),
    cardNumber: Joi.string().pattern(/^[0-9]+$/).required(),
    cardholderName: Joi.string().required(),
    password: Joi.string().min(4).max(4).pattern(/^[0-9]+$/).required(),
    cardType: Joi.string().valid("credit", "debit", "ambos").required(),
    flag: Joi.string().valid("visa", "mastercard", "elo", "hipercard", "americanExpress").required(),
    isVirtual: Joi.boolean().required(),
    securityCode: Joi.string().min(4).max(4).pattern(/^[0-9]+$/).required()
});

export default cardsSchema;