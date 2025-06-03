const {Router} = require("express");
const {
    createNewKelas,
    createNewKelasMany,
    assignSiswaToKelas,
    assignSiswaToKelasBatch
} = require("../controllers/kelas.controller");
const {
    authenticate,
    authorizeAdmin,
} = require("../middleware/authMiddleware.js");
const {updateLastActivity} = require("../middleware/activityMiddleware.js");
const validateRequest = require("../middleware/validateRequest");
const {kelasSchema} = require("../validators/kelasValidator");
const {viewKelas} = require("../controllers/kelas.controller");
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
