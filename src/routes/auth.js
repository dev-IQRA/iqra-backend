const { Router } = require("express");
const { login, verify, logout } = require("../controllers/auth.controller");
const { loginSchema } = require("../validators/authValidator");
const validateRequest = require("../middleware/validateRequest");
const authLimiter = require("../middleware/rateLimiter");
const { preventLoginIfLoggedIn, authenticate } = require("../middleware/authMiddleware");
const authRouter = Router();

authRouter.post(
	"/api/auth/login",
	preventLoginIfLoggedIn,
	authLimiter,
	validateRequest(loginSchema),
	login,
);

authRouter.get(
	"/api/auth/verify",
	authenticate,
	verify,
);

authRouter.get("/api/auth/logout", logout);

module.exports = authRouter;
