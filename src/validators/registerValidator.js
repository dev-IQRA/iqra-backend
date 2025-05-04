const Joi = require("joi");

const registerSchema = Joi.object({
    full_name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("admin", "siswa", "guru").required(),
});

module.exports = { registerSchema };