const Joi = require("joi");

const mapelSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "ID is required.",
    }),
    nama_mapel: Joi.string().min(3).max(50).required().messages({
        "string.min": "Nama Mapel must be at least 3 characters.",
        "string.max": "Nama Mapel cannot exceed 50 characters.",
        "any.required": "Nama Mapel is required.",
    }),
    deskripsi: Joi.string().min(10).max(255).required().messages({
        "string.min": "Deskripsi must be at least 10 characters.",
        "string.max": "Deskripsi cannot exceed 255 characters.",
        "any.required": "Deskripsi is required.",
    }),
});

module.exports = { mapelSchema };