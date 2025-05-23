const { Router } = require("express");
const { viewAllMapel, createMapel, viewMapelById } = require("../controllers/mapel.controller");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const { mapelSchema } = require("../validators/mapelValidator");

const mapelRouter = Router();

// 🔹 Endpoint untuk melihat semua mata pelajaran
mapelRouter.get(
    "/api/admin/mapel",
    authenticate,
    viewAllMapel
);

// 🔹 Endpoint untuk melihat mata pelajaran berdasarkan ID
mapelRouter.get(
    "/api/admin/mapel/:id",
    authenticate,
    viewMapelById
);

// 🔹 Endpoint untuk membuat mata pelajaran baru (hanya admin)
mapelRouter.post(
    "/api/admin/mapel",
    authenticate,
    authorizeAdmin,
    validateRequest(mapelSchema),
    createMapel
);

module.exports = mapelRouter;