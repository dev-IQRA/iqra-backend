const rateLimit = require("express-rate-limit");

/** @type {RequestHandler} */
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP, please try again later.",
	skipSuccessfulRequests: true,
});

module.exports = authLimiter;
