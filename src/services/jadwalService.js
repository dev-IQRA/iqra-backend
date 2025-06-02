const prisma = require("../prisma");
const { formatTo24Hour } = require("../utils/timeFormatter");

const getAllJadwal = async () => {
	try {
		const jadwal = await prisma.jadwal.findMany({
			include: {
				kelas: {
					select: { id: true, nama_kelas: true, tingkat: true },
				},
				mapel: {
					select: { id: true, nama_mapel: true, deskripsi: true },
				},
				guru: {
					select: {
						id: true,
						full_name: true,
						email: true,
						role: true,
					},
				},
			},
		});

		return jadwal.map((j) => ({
			...j,
			jam_mulai: formatTo24Hour(j.jam_mulai),
			jam_selesai: formatTo24Hour(j.jam_selesai),
		}));
	} catch (error) {
		console.error("Error fetching jadwal:", error);
		throw new Error("Failed to fetch jadwal");
	}
};

const createJadwal = async (data) => {
	try {
		return await prisma.jadwal.create({
			data: {
				kelas_id: data.kelas_id,
				mapel_id: data.mapel_id,
				guru_id: data.guru_id, // opsional
				hari: data.hari,
				jam_mulai: new Date(data.jam_mulai), // pastikan format yang dikirim cocok (ISO string)
				jam_selesai: new Date(data.jam_selesai),
			},
		});
	} catch (error) {
		console.error("Error creating jadwal:", error);
		throw new Error("Failed to create jadwal");
	}
};

const getJadwalById = async (id) => {
	try {
		const jadwal = await prisma.jadwal.findUnique({
			where: { id },
			include: {
				kelas: {
					select: { id: true, nama_kelas: true, tingkat: true },
				},
				mapel: {
					select: { id: true, nama_mapel: true, deskripsi: true },
				},
				guru: { select: { id: true, full_name: true } },
			},
		});

		if (!jadwal) return null;

		return {
			...jadwal,
			jam_mulai: formatTo24Hour(jadwal.jam_mulai),
			jam_selesai: formatTo24Hour(jadwal.jam_selesai),
		};
	} catch (error) {
		console.error("Error fetching jadwal by ID:", error);
		throw new Error("Failed to fetch jadwal");
	}
};

const updateJadwal = async (id, data) => {
	try {
		// Convert time fields to Date objects if present
		const updateData = { ...data };
		if (updateData.jam_mulai) {
			updateData.jam_mulai = new Date(updateData.jam_mulai);
		}
		if (updateData.jam_selesai) {
			updateData.jam_selesai = new Date(updateData.jam_selesai);
		}

		return await prisma.jadwal.update({
			where: { id },
			data: updateData,
		});
	} catch (error) {
		console.error("Error updating jadwal:", error);
		throw new Error("Failed to update jadwal");
	}
};

const deleteJadwal = async (id) => {
	try {
		return await prisma.jadwal.delete({
			where: { id },
		});
	} catch (error) {
		console.error("Error deleting jadwal:", error);
		throw new Error("Failed to delete jadwal");
	}
};

const getJadwalByKelas = async (kelasId) => {
	try {
		const jadwal = await prisma.jadwal.findMany({
			where: { kelas_id: kelasId },
			include: {
				kelas: {
					select: { id: true, nama_kelas: true, tingkat: true },
				},
				mapel: {
					select: { id: true, nama_mapel: true, deskripsi: true },
				},
				guru: { select: { id: true, full_name: true, email: true } },
			},
			orderBy: [{ hari: "asc" }, { jam_mulai: "asc" }],
		});

		return jadwal.map((j) => ({
			...j,
			jam_mulai: formatTo24Hour(j.jam_mulai),
			jam_selesai: formatTo24Hour(j.jam_selesai),
		}));
	} catch (error) {
		console.error("Error fetching jadwal by kelas:", error);
		throw new Error("Failed to fetch jadwal by kelas");
	}
};

const getJadwalHariIni = async (kelasId) => {
	try {
		// Get current day in Indonesian format
		const today = new Date();
		const days = [
			"Minggu",
			"Senin",
			"Selasa",
			"Rabu",
			"Kamis",
			"Jumat",
			"Sabtu",
		];
		const currentDay = days[today.getDay()];

		const jadwal = await prisma.jadwal.findMany({
			where: {
				kelas_id: kelasId,
				hari: currentDay,
			},
			include: {
				kelas: {
					select: { id: true, nama_kelas: true, tingkat: true },
				},
				mapel: {
					select: { id: true, nama_mapel: true, deskripsi: true },
				},
				guru: { select: { id: true, full_name: true, email: true } },
			},
			orderBy: { jam_mulai: "asc" },
		});

		return jadwal.map((j) => ({
			...j,
			jam_mulai: formatTo24Hour(j.jam_mulai),
			jam_selesai: formatTo24Hour(j.jam_selesai),
		}));
	} catch (error) {
		console.error("Error fetching jadwal hari ini:", error);
		throw new Error("Failed to fetch jadwal hari ini");
	}
};

const getJadwalByGuru = async (guruId) => {
	try {
		const jadwal = await prisma.jadwal.findMany({
			where: { guru_id: guruId },
			include: {
				kelas: {
					select: { id: true, nama_kelas: true, tingkat: true },
				},
				mapel: {
					select: { id: true, nama_mapel: true, deskripsi: true },
				},
				guru: { select: { id: true, full_name: true, email: true } },
			},
			orderBy: [{ hari: "asc" }, { jam_mulai: "asc" }],
		});

		return jadwal.map((j) => ({
			...j,
			jam_mulai: formatTo24Hour(j.jam_mulai),
			jam_selesai: formatTo24Hour(j.jam_selesai),
		}));
	} catch (error) {
		console.error("Error fetching jadwal by guru:", error);
		throw new Error("Failed to fetch jadwal by guru");
	}
};

const getJadwalGuruHariIni = async (guruId) => {
	try {
		// Get current day in Indonesian format
		const today = new Date();
		const days = [
			"Minggu",
			"Senin",
			"Selasa",
			"Rabu",
			"Kamis",
			"Jumat",
			"Sabtu",
		];
		const currentDay = days[today.getDay()];

		const jadwal = await prisma.jadwal.findMany({
			where: {
				guru_id: guruId,
				hari: currentDay,
			},
			include: {
				kelas: {
					select: { id: true, nama_kelas: true, tingkat: true },
				},
				mapel: {
					select: { id: true, nama_mapel: true, deskripsi: true },
				},
				guru: { select: { id: true, full_name: true, email: true } },
			},
			orderBy: { jam_mulai: "asc" },
		});

		return jadwal.map((j) => ({
			...j,
			jam_mulai: formatTo24Hour(j.jam_mulai),
			jam_selesai: formatTo24Hour(j.jam_selesai),
		}));
	} catch (error) {
		console.error("Error fetching jadwal guru hari ini:", error);
		throw new Error("Failed to fetch jadwal guru hari ini");
	}
};

const getMapelByGuru = async (guruId) => {
	try {
		// Get unique mata pelajaran yang diajar oleh guru
		const jadwalGuru = await prisma.jadwal.findMany({
			where: { guru_id: guruId },
			include: {
				mapel: {
					select: { id: true, nama_mapel: true, deskripsi: true },
				},
				kelas: {
					select: { id: true, nama_kelas: true, tingkat: true },
				},
			},
			distinct: ["mapel_id"],
		});

		// Format mapel data for frontend
		const mapelData = jadwalGuru.map((jadwal) => {
			return {
				id: jadwal.mapel.id,
				code: jadwal.mapel.id,
				name: jadwal.mapel.nama_mapel,
				description: jadwal.mapel.deskripsi,
				color: "#e67e22", // Default color
			};
		});

		return mapelData;
	} catch (error) {
		console.error("Error fetching mapel by guru:", error);
		throw new Error("Failed to fetch mapel by guru");
	}
};

module.exports = {
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
};
