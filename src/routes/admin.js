const { Router } = require("express");
const { registerUser, getUsers, updateUser, removeUser } = require("../controllers/admin.controller");
const {
	authenticate,
	authorizeAdmin,
} = require("../middleware/authMiddleware.js");
const validateRequest = require("../middleware/validateRequest");
const { registerSchema } = require("../validators/registerValidator");
const adminRouter = Router();

adminRouter.post(
	"/api/admin/register",
	authenticate,
	authorizeAdmin,
	validateRequest(registerSchema),
	registerUser,
);

adminRouter.get(
	"/api/admin/users",
	authenticate,
	authorizeAdmin,
	getUsers,
);

adminRouter.put(
	"/api/admin/users/:userId",
	authenticate,
	authorizeAdmin,
	updateUser,
);

adminRouter.delete(
	"/api/admin/users/:userId",
	authenticate,
	authorizeAdmin,
	removeUser,
);

module.exports = adminRouter;
