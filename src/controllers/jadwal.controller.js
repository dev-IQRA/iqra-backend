const jadwalSchema = require("../validators/jadwalValidator");
const {
	getAllJadwal,
	createJadwal,
	getJadwalById,
	updateJadwal,
	deleteJadwal,
	getJadwalByKelas,
	getJadwalHariIni,
	getJadwalByGuru,
	getJadwalGuruHariIni,
	getMapelByGuru,
} = require("../services/jadwalService");
const { formatTo24Hour } = require("../utils/timeFormatter");
const handleError = require("../utils/errorHandler");
const prisma = require("../prisma");

const viewAllJadwal = async (req, res) => {
	try {
		const jadwal = await getAllJadwal();
		if (!jadwal || jadwal.length === 0)
			return res
				.status(404)
				.json({ message: "Tidak ada jadwal ditemukan." });

		res.status(200).json({ jadwal });
	} catch (err) {
		handleError(res, err);
	}
};

const addJadwal = async (req, res) => {
	const { error } = jadwalSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	try {
		const jadwal = await createJadwal(req.body);
		res.status(201).json({ jadwal });
	} catch (err) {
		handleError(res, err);
	}
};

const getJadwalDetail = async (req, res) => {
	const { id } = req.params;
	try {
		const jadwal = await getJadwalById(id);
		if (!jadwal)
			return res.status(404).json({ message: "Jadwal tidak ditemukan." });

		// Format jam_mulai dan jam_selesai ke format 24 jam
		const formattedJadwal = {
			...jadwal,
			jam_mulai: formatTo24Hour(jadwal.jam_mulai),
			jam_selesai: formatTo24Hour(jadwal.jam_selesai),
		};

		res.status(200).json({ jadwal: formattedJadwal });
	} catch (err) {
		handleError(res, err);
	}
};

const updateJadwalData = async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	// Validate update data
	const { error } = jadwalSchema.validate(data);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	// Transform time fields if present
	if (data.jam_mulai) {
		data.jam_mulai = new Date(data.jam_mulai);
	}
	if (data.jam_selesai) {
		data.jam_selesai = new Date(data.jam_selesai);
	}

	try {
		const jadwal = await updateJadwal(id, data);
		res.status(200).json({ jadwal });
	} catch (err) {
		handleError(res, err);
	}
};

const deleteJadwalData = async (req, res) => {
	const { id } = req.params;
	try {
		await deleteJadwal(id);
		res.status(200).json({ message: "Jadwal berhasil dihapus." });
	} catch (err) {
		handleError(res, err);
	}
};

const getJadwalSiswa = async (req, res) => {
	try {
		const userId = req.user.id;

		// Get user data with kelas_id
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { kelas_id: true, full_name: true },
		});

		if (!user || !user.kelas_id) {
			return res.status(404).json({
				message: "Siswa belum terdaftar di kelas manapun",
			});
		}

		const jadwal = await getJadwalByKelas(user.kelas_id);

		res.status(200).json({
			jadwal,
			siswa: user.full_name,
			kelas_id: user.kelas_id,
		});
	} catch (err) {
		handleError(res, err);
	}
};

const getJadwalSiswaHariIni = async (req, res) => {
	try {
		const userId = req.user.id;

		// Get user data with kelas_id
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { kelas_id: true, full_name: true },
		});

		if (!user || !user.kelas_id) {
			return res.status(404).json({
				message: "Siswa belum terdaftar di kelas manapun",
			});
		}

		const jadwal = await getJadwalHariIni(user.kelas_id);

		res.status(200).json({
			jadwal,
			siswa: user.full_name,
			kelas_id: user.kelas_id,
		});
	} catch (err) {
		handleError(res, err);
	}
};

const getJadwalGuru = async (req, res) => {
	try {
		const userId = req.user.id;

		// Get user data to verify role
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { id: true, full_name: true, role: true },
		});

		if (!user || user.role !== "guru") {
			return res.status(403).json({
				message:
					"Akses ditolak. Hanya guru yang dapat mengakses jadwal mengajar.",
			});
		}

		const jadwal = await getJadwalByGuru(user.id);

		res.status(200).json({
			jadwal,
			guru: user.full_name,
			guru_id: user.id,
		});
	} catch (err) {
		handleError(res, err);
	}
};

const getJadwalGuruHariIniController = async (req, res) => {
	try {
		const userId = req.user.id;

		// Get user data to verify role
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { id: true, full_name: true, role: true },
		});

		if (!user || user.role !== "guru") {
			return res.status(403).json({
				message:
					"Akses ditolak. Hanya guru yang dapat mengakses jadwal mengajar.",
			});
		}

		const jadwal = await getJadwalGuruHariIni(user.id);

		res.status(200).json({
			jadwal,
			guru: user.full_name,
			guru_id: user.id,
		});
	} catch (err) {
		handleError(res, err);
	}
};

const getMapelGuru = async (req, res) => {
	try {
		const userId = req.user.id;

		// Get user data to verify role
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { id: true, full_name: true, role: true },
		});

		if (!user || user.role !== "guru") {
			return res.status(403).json({
				message:
					"Akses ditolak. Hanya guru yang dapat mengakses mata pelajaran.",
			});
		}

		const mapel = await getMapelByGuru(user.id);

		res.status(200).json({
			mapel,
			guru: user.full_name,
			guru_id: user.id,
		});
	} catch (err) {
		handleError(res, err);
	}
};

module.exports = {
	viewAllJadwal,
	addJadwal,
	getJadwalDetail,
	updateJadwalData,
	deleteJadwalData,
	getJadwalSiswa,
	getJadwalSiswaHariIni,
	getJadwalGuru,
	getJadwalGuruHariIni: getJadwalGuruHariIniController,
	getMapelGuru,
};
