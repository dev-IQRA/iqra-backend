const { Router } = require("express");
const { registerUser } = require("../controllers/admin.controller");
const {
	authenticate,
	authorizeAdmin,
} = require("../middleware/authMiddleware.js");
const validateRequest = require("../middleware/validateRequest");
const { registerSchema } = require("../validators/registerValidator");
const adminRouter = Router();

adminRouter.post(
	"/api/admin/register",
	authorizeAdmin,
	authenticate,
	validateRequest(registerSchema),
	registerUser,
);

module.exports = adminRouter;
