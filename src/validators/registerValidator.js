const Joi = require("joi");

const registerSchema = Joi.object({
	full_name: Joi.string().min(2).max(100).required().messages({
		"string.min": "Name must be at least 2 characters long",
		"string.max": "Name cannot exceed 100 characters",
	}),
	username: Joi.string().alphanum().min(3).max(30).required().messages({
		"string.alphanum": "Username hanya boleh huruf dan angka",
		"string.min": "Username minimal 3 karakter",
		"string.max": "Username maksimal 30 karakter",
	}),
	email: Joi.string().email().max(255).required().messages({
		"string.email": "Please enter a valid email address",
		"string.max": "Email cannot exceed 255 characters",
	}),
	password: Joi.string().min(8).max(72).required().messages({
		"string.min": "Password must be at least 8 characters long",
		"string.max": "Password cannot exceed 72 characters",
	}),
	role: Joi.string().valid("admin", "siswa", "guru").required(),
});

module.exports = { registerSchema };
