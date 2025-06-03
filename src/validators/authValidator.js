const Joi = require("joi");

const loginSchema = Joi.object({
	username: Joi.string().min(3).max(30).required().messages({
		"string.min": "Username minimal 3 karakter.",
		"string.max": "Username maksimal 30 karakter.",
		"any.required": "Username wajib diisi.",
	}),
	password: Joi.string().min(8).required().messages({
		"string.min": "Password must be at least 8 characters long.",
		"any.required": "Password is required.",
	}),
});

module.exports = { loginSchema };
