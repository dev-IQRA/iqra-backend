const {
	viewAllKelas,
	findKelasById,
	createKelas,
	assignSiswaToKelasService
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

const createNewKelasMany = async (req, res) => {
	const kelasArray = Array.isArray(req.body) ? req.body : [req.body];

	try {
		const results = [];
		for (const kelasData of kelasArray) {
			const { id, nama_kelas, tingkat } = kelasData;
			const existingKelas = await findKelasById(id);
			if (existingKelas) {
				results.push({
					id,
					status: "failed",
					message: "This kelas already existed.",
				});
				continue;
			}
			const result = await createKelas({ id, nama_kelas, tingkat });
			results.push({
				id: result.id,
				status: "success",
				result,
				uri: `/kelas/${result.id}`,
			});
		}
		return res.status(201).json({ results });
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

const assignSiswaToKelas = async (req, res) => {
	const {kelasId, siswaId} = req.body;

	try {
		if (!kelasId || !siswaId) {
			return res.status(400).json({
				message: "kelasId and siswaId are required.",
			});
		}

		const result = await assignSiswaToKelasService(kelasId, siswaId);

		if (result.error) {
			return res.status(400).json({
				message: result.message,
			});
		}

		return res.status(200).json({
			message: "Siswa successfully assigned to kelas.",
			result,
		});
	} catch (err) {
		handleError(res, err);
	}
};


const assignSiswaToKelasBatch = async (req, res) => {
	const {kelasId, siswaIds} = req.body;

	try {
		if (!kelasId || !Array.isArray(siswaIds) || siswaIds.length === 0) {
			return res.status(400).json({
				message: "kelasId and an array of siswaIds are required.",
			});
		}

		const results = [];
		for (const siswaId of siswaIds) {
			const result = await assignSiswaToKelasService(kelasId, siswaId);

			if (result.error) {
				results.push({
					siswaId,
					status: "failed",
					message: result.message,
				});
				continue;
			}

			results.push({
				siswaId,
				status: "success",
				message: "Siswa successfully assigned to kelas.",
				result,
			});
		}

		return res.status(200).json({
			message: "Batch assignment completed.",
			results,
		});
	} catch (err) {
		handleError(res, err);
	}
};

module.exports = {
	viewKelasById,
	viewKelas,
	createNewKelas,
	createNewKelasMany,
	assignSiswaToKelas,
	assignSiswaToKelasBatch
};