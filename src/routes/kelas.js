const {Router} = require("express");
const {
	createNewKelas,
	createNewKelasMany,
	assignSiswaToKelas,
	assignSiswaToKelasBatch,
	viewKelas,
} = require("../controllers/kelas.controller");
const {
	authenticate,
	authorizeAdmin,
} = require("../middleware/authMiddleware");
const {updateLastActivity} = require("../middleware/activityMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {kelasSchema} = require("../validators/kelasValidator");
const kelasRouter = Router();

kelasRouter.post(
	"/api/admin/kelas",
	authenticate,
	updateLastActivity,
	authorizeAdmin,
	validateRequest(kelasSchema),
	createNewKelas,
);

kelasRouter.post(
	"/api/admin/kelas-many",
	authenticate,
	updateLastActivity,
	authorizeAdmin,
	createNewKelasMany,
);

kelasRouter.get(
	"/api/admin/kelas",
	authenticate,
	updateLastActivity,
	authorizeAdmin,
	viewKelas,
);

kelasRouter.get(
	"/api/admin/kelas/assign",
	authenticate,
	updateLastActivity,
	authorizeAdmin,
	assignSiswaToKelas,
);

kelasRouter.get(
	"/api/admin/kelas/assign-batch",
	authenticate,
	updateLastActivity,
	authorizeAdmin,
	assignSiswaToKelasBatch,
);
module.exports = kelasRouter;
