const { Router } = require("express");
const {
	viewAllKelasMapel,
	addKelasMapel,
	getKelasMapelDetail,
	updateKelasMapelData,
	deleteKelasMapelData,
} = require("../controllers/kelasMapel.controller");
const {
	authenticate,
	authorizeAdmin,
} = require("../middleware/authMiddleware");

const kelasMapelRouter = Router();

// Endpoint untuk admin mengelola kelas_mapel
kelasMapelRouter.get(
	"/api/admin/kelasmapel",
	authenticate,
	authorizeAdmin,
	viewAllKelasMapel,
);
kelasMapelRouter.post(
	"/api/admin/kelasmapel",
	authenticate,
	authorizeAdmin,
	addKelasMapel,
);
kelasMapelRouter.get(
	"/api/admin/kelasmapel/:id",
	authenticate,
	authorizeAdmin,
	getKelasMapelDetail,
);
kelasMapelRouter.put(
	"/api/admin/kelasmapel/:id",
	authenticate,
	authorizeAdmin,
	updateKelasMapelData,
);
kelasMapelRouter.delete(
	"/api/admin/kelasmapel/:id",
	authenticate,
	authorizeAdmin,
	deleteKelasMapelData,
);

module.exports = kelasMapelRouter;
