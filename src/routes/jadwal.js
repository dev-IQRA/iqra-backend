const { Router } = require("express");
const {
  viewAllJadwal,
  addJadwal,
  getJadwalDetail,
  updateJadwalData,
  deleteJadwalData,
  getJadwalSiswa,
  getJadwalSiswaHariIni
} = require("../controllers/jadwal.controller");
const { authenticate } = require("../middleware/authMiddleware");

const jadwalRouter = Router();

// Misalnya, mengakses via /api/jadwal
jadwalRouter.get("/api/jadwal", viewAllJadwal);
jadwalRouter.post("/api/jadwal", addJadwal);
jadwalRouter.get("/api/jadwal/siswa", authenticate, getJadwalSiswa);
jadwalRouter.get("/api/jadwal/siswa/hari-ini", authenticate, getJadwalSiswaHariIni);
jadwalRouter.get("/api/jadwal/:id", getJadwalDetail);
jadwalRouter.put("/api/jadwal/:id", updateJadwalData);
jadwalRouter.delete("/api/jadwal/:id", deleteJadwalData);

module.exports = jadwalRouter;