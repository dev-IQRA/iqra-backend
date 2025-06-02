const {
	viewAllKelas,
	findKelasById,
	createKelas,
} = require("../services/kelasService");
const handleError = require("../utils/errorHandler");

const createNewKelas = async (req, res) => {
	const { id, nama_kelas, tingkat } = req.body;

	try {
		const existingKelas = await findKelasById(id);
		if (existingKelas)
			return res
				.status(409)
				.json({ message: "This kelas already existed." });

		const result = await createKelas({ id, nama_kelas, tingkat });
		return res.status(201).json({
			result,
			uri: `/kelas/${result.id}`,
		});
	} catch (err) {
		handleError(res, err);
	}
};

const viewKelas = async (req, res) => {
	try {
		const {
			page = 1,
			limit = 10,
			sortBy = "nama_kelas",
			order = "asc",
		} = req.query;
		const result = await viewAllKelas(
			Number.parseInt(page, 10),
			Number.parseInt(limit, 10),
			sortBy,
			order,
		);
		if (!result || result.kelas.length === 0) {
			return res
				.status(404)
				.json({ message: "Tidak ada kelas yang terdaftar." });
		}
		return res.status(200).json({ result });
	} catch (err) {
		handleError(res, err);
	}
};

const viewKelasById = async (req, res) => {
	try {
		const { id } = req.params; // Ambil ID dari parameter URL
		const result = await findKelasById(id);

		if (!result)
			return res.status(404).json({ message: "Kelas not found." });

		return res.status(200).json({ result });
	} catch (err) {
		handleError(res, err);
	}
};

module.exports = { viewKelasById, viewKelas, createNewKelas };
