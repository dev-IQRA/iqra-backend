const { Router } = require("express");
const { login, verify, logout } = require("../controllers/auth.controller");
const { loginSchema } = require("../validators/authValidator");
const validateRequest = require("../middleware/validateRequest");
const {
	preventLoginIfLoggedIn,
	authenticate,
} = require("../middleware/authMiddleware");
const { updateLastActivity } = require("../middleware/activityMiddleware");
const authRouter = Router();

authRouter.post(
	"/api/auth/login",
	preventLoginIfLoggedIn,
	validateRequest(loginSchema),
	login,
);

authRouter.get("/api/auth/verify", authenticate, updateLastActivity, verify);

authRouter.get("/api/auth/logout", authenticate, logout);

module.exports = authRouter;
