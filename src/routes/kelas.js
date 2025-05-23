const { Router } = require("express");
const { createNewKelas } = require("../controllers/kelas.controller");
const {
    authenticate,
    authorizeAdmin,
} = require("../middleware/authMiddleware.js");
const validateRequest = require("../middleware/validateRequest");
const { kelasSchema } = require("../validators/kelasValidator");
const { viewKelas } = require("../controllers/kelas.controller");
const kelasRouter = Router();

kelasRouter.post(
    "/api/admin/kelas",
    authenticate,
    authorizeAdmin,
    validateRequest(kelasSchema),
    createNewKelas,
);

kelasRouter.get(
    "/api/admin/kelas",
    authenticate,
    authorizeAdmin,
    viewKelas,
);

module.exports = kelasRouter;
