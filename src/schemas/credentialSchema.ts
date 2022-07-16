import Joi from "joi";

import { CreateCredentialData } from "../services/credentialsServices.js";

const credentialSchema = Joi.object<CreateCredentialData>({
    title: Joi.string().max(50).required(),
    url: Joi.string().uri().required(),
    login: Joi.string().email().required(),
    password: Joi.string().required()
});

export default credentialSchema;