const jwt = require("jsonwebtoken");
const { findUserByUsername } = require("../services/userService");
const { verifyPassword } = require("../utils/passwordUtils");
const handleError = require("../utils/errorHandler");

const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await findUserByUsername(username);
		if (!user || !(await verifyPassword(user.hash, password))) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ id: user.id, username: user.username, role: user.role },
			process.env.JWT_TOKEN_SECRET,
			{ expiresIn: "24h" }
		);

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 3600000
		});

		return res.status(200).json({
			message: "Login successful",
			user: {
				id: user.id,
				username: user.username,
				role: user.role,
				email: user.email,
				full_name: user.full_name
			},
			token
		});
	} catch (error) {
		handleError(res, error);
	}
};

const verify = async (req, res) => {
	try {
		// req.user sudah tersedia dari middleware authenticate
		if (!req.user) {
			return res.status(401).json({ message: "Token tidak valid" });
		}

		res.status(200).json({
			message: "Token valid",
			user: {
				id: req.user.id,
				username: req.user.username,
				role: req.user.role,
				email: req.user.email,
				full_name: req.user.full_name
			}
		});
	} catch (error) {
		handleError(res, error, 401, "Token tidak valid");
	}
};

const logout = async (req, res) => {
	try {
		// Clear cookie
		res.clearCookie("token");
		res.status(200).json({ message: "Logout berhasil" });
	} catch (error) {
		handleError(res, error);
	}
};

module.exports = { login, verify, logout };
