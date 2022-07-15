import Joi from "joi";

import { CreateNotesData } from "../services/notesServices";

const notesSchema = Joi.object<CreateNotesData>({
    title: Joi.string().max(50).required(),
    note: Joi.string().max(1000).required(),
    userId: Joi.number().required()
});

export default notesSchema;