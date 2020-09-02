import Joi from "@hapi/joi";

export const createTransactionSchema = Joi.object().keys({
    document: Joi.string().required(),
    phone: Joi.string().required(),
    value: Joi.number().required()
});

export const confirmTransactionSchema = Joi.object().keys({
    token: Joi.string().required(),
    session_id: Joi.string().required()
});
  