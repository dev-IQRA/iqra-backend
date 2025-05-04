const { Router } = require("express");
const { registerUser } = require("../controllers/admin.controller");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware.js");

const adminRouter = Router();

adminRouter.post("/api/admin/register", authenticate, authorizeAdmin, registerUser);

module.exports = adminRouter;