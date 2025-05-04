const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { loginSchema } = require("../validators/authValidator");
const validateRequest = require("../middleware/validateRequest");

const authRouter = Router();

authRouter.post("/api/auth/login", validateRequest(loginSchema), login);

module.exports = authRouter;