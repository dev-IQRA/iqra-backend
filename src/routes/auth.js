const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { loginSchema } = require("../validators/authValidator");
const validateRequest = require("../middleware/validateRequest");
const authLimiter = require("../middleware/rateLimiter");
const {preventLoginIfLoggedIn} = require("../middleware/authMiddleware")
const authRouter = Router();

authRouter.post(
	"/api/auth/login",
	preventLoginIfLoggedIn,
	authLimiter,
	validateRequest(loginSchema),
	login,
);

authRouter.post("/api/auth/logout", (req, res) => {
	res.clearCookie("token");
	return res.status(200).json({ message: "Logged out successfully" });
});
module.exports = authRouter;
