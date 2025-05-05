const passport = require("passport");

const authenticate = passport.authenticate("jwt", { session: false });

const authorizeAdmin = (req, res, next) => {
	console.log(req.user);
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	if (req.user.role === "admin") {
		return next();
	}
	return res.status(403).json({ message: "Access denied" });
};

const preventLoginIfLoggedIn = (req, res, next) => {
	const token = req.cookies?.token;
	if (token) {
		return res.status(400).json({ message: "You are already logged in." });
	}
	next();
};
module.exports = { authenticate, authorizeAdmin, preventLoginIfLoggedIn };
