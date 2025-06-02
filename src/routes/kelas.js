const { Router } = require("express");
const { createNewKelas } = require("../controllers/kelas.controller");
const {
    authenticate,
    authorizeAdmin,
} = require("../middleware/authMiddleware.js");
const { updateLastActivity } = require("../middleware/activityMiddleware.js");
const validateRequest = require("../middleware/validateRequest");
const { kelasSchema } = require("../validators/kelasValidator");
const { viewKelas } = require("../controllers/kelas.controller");
const kelasRouter = Router();

kelasRouter.post(
    "/api/admin/kelas",
    authenticate,
    updateLastActivity,
    authorizeAdmin,
    validateRequest(kelasSchema),
    createNewKelas,
);

kelasRouter.get(
    "/api/admin/kelas",
    authenticate,
    updateLastActivity,
    authorizeAdmin,
    viewKelas,
);

module.exports = kelasRouter;
