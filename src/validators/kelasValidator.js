const Joi = require("joi");

const kelasSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "ID is required.",
    }),
    nama_kelas: Joi.string().required().messages({
        "any.required": "Nama Kelas is required.",
    }),
    tingkat: Joi.number().integer().required().messages({
        "number.base": "Tingkat must be an integer.",
        "any.required": "Tingkat is required.",
    }),
});

module.exports = { kelasSchema };
