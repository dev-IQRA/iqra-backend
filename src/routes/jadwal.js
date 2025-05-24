const { Router } = require("express");
const {
  viewAllJadwal,
  addJadwal,
  getJadwalDetail,
  updateJadwalData,
  deleteJadwalData
} = require("../controllers/jadwal.controller");

const jadwalRouter = Router();

// Misalnya, mengakses via /api/jadwal
jadwalRouter.get("/api/jadwal", viewAllJadwal);
jadwalRouter.post("/api/jadwal", addJadwal);
jadwalRouter.get("/api/jadwal/:id", getJadwalDetail);
jadwalRouter.put("/api/jadwal/:id", updateJadwalData);
jadwalRouter.delete("/api/jadwal/:id", deleteJadwalData);

module.exports = jadwalRouter;