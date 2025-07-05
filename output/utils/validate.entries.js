import Joi from "joi";
export const userValidator = Joi.object({
    name: Joi.string().min(4).max(30).optional(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(50).alphanum(),
});
