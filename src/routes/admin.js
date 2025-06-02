const { Router } = require("express");
const {
	registerUser,
	getUsers,
	updateUser,
	removeUser,
	getOnlineUsersList,
} = require("../controllers/admin.controller");
const {
	authenticate,
	authorizeAdmin,
} = require("../middleware/authMiddleware.js");
const { updateLastActivity } = require("../middleware/activityMiddleware.js");
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
	updateLastActivity,
	authorizeAdmin,
	getUsers,
);

adminRouter.put(
	"/api/admin/users/:userId",
	authenticate,
	updateLastActivity,
	authorizeAdmin,
	updateUser,
);

adminRouter.delete(
	"/api/admin/users/:userId",
	authenticate,
	updateLastActivity,
	authorizeAdmin,
	removeUser,
);

adminRouter.get(
	"/api/admin/online-users",
	authenticate,
	updateLastActivity,
	authorizeAdmin,
	getOnlineUsersList,
);

module.exports = adminRouter;
