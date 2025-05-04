const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { loginSchema } = require("../validators/authValidator");
const validateRequest = require("../middleware/validateRequest");
const authLimiter = require("../middleware/rateLimiter")
const authRouter = Router();

authRouter.post("/api/auth/login",authLimiter, validateRequest(loginSchema), login);

module.exports = authRouter;