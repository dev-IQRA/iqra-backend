const Joi = require("joi");

const jadwalSchema = Joi.object({
	kelas_id: Joi.string().required().messages({
		"string.empty": "kelas_id tidak boleh kosong.",
		"any.required": "kelas_id wajib diisi.",
	}),
	mapel_id: Joi.string().required().messages({
		"string.empty": "mapel_id tidak boleh kosong.",
		"any.required": "mapel_id wajib diisi.",
	}),
	guru_id: Joi.string().optional().allow(null),
	hari: Joi.string()
		.valid("Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu")
		.required()
		.messages({
			"any.required": "hari wajib diisi.",
			"any.only": "hari harus antara Senin - Sabtu.",
		}),
	jam_mulai: Joi.date().iso().required().messages({
		"date.base": "jam_mulai harus dalam format tanggal.",
		"date.iso": "Format jam_mulai harus ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).",
		"any.required": "jam_mulai wajib diisi.",
	}),
	jam_selesai: Joi.date()
		.iso()
		.greater(Joi.ref("jam_mulai"))
		.required()
		.messages({
			"date.base": "jam_selesai harus dalam format tanggal.",
			"date.iso":
				"Format jam_selesai harus ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).",
			"date.greater": "jam_selesai harus lebih besar dari jam_mulai.",
			"any.required": "jam_selesai wajib diisi.",
		}),
});

module.exports = jadwalSchema;
