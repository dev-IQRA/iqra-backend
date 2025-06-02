const { Router } = require("express");
const {
	viewAllJadwal,
	addJadwal,
	getJadwalDetail,
	updateJadwalData,
	deleteJadwalData,
	getJadwalSiswa,
	getJadwalSiswaHariIni,
	getJadwalGuru,
	getJadwalGuruHariIni,
	getMapelGuru,
} = require("../controllers/jadwal.controller");
const { authenticate } = require("../middleware/authMiddleware");
const { updateLastActivity } = require("../middleware/activityMiddleware.js");

const jadwalRouter = Router();

// Misalnya, mengakses via /api/jadwal
jadwalRouter.get("/api/jadwal", viewAllJadwal);
jadwalRouter.post("/api/jadwal", addJadwal);
jadwalRouter.get(
	"/api/jadwal/siswa",
	authenticate,
	updateLastActivity,
	getJadwalSiswa,
);
jadwalRouter.get(
	"/api/jadwal/siswa/hari-ini",
	authenticate,
	updateLastActivity,
	getJadwalSiswaHariIni,
);
jadwalRouter.get(
	"/api/jadwal/guru",
	authenticate,
	updateLastActivity,
	getJadwalGuru,
);
jadwalRouter.get(
	"/api/jadwal/guru/hari-ini",
	authenticate,
	updateLastActivity,
	getJadwalGuruHariIni,
);
jadwalRouter.get(
	"/api/jadwal/guru/mapel",
	authenticate,
	updateLastActivity,
	getMapelGuru,
);
jadwalRouter.get("/api/jadwal/:id", getJadwalDetail);
jadwalRouter.put("/api/jadwal/:id", updateJadwalData);
jadwalRouter.delete("/api/jadwal/:id", deleteJadwalData);

module.exports = jadwalRouter;
