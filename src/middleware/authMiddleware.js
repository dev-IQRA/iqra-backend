const passport = require("passport");

const authenticate = passport.authenticate("jwt", { session: false });

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).json({ message: "Access denied" });
};

module.exports = { authenticate, authorizeAdmin };