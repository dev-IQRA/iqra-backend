const { findUserByEmail, createUser, findUserByUsername } = require("../services/userService");
const { hashPassword } = require("../utils/passwordUtils");
const handleError = require("../utils/errorHandler");

const registerUser = async (req, res) => {
	const { full_name, email, username, password, role } = req.body;

	try {
		const existingUser = await findUserByUsername(username);
		if (existingUser) {
			return res.status(409).json({ message: "User already exists" });
		}

		const hash = await hashPassword(password);
		const newUser = await createUser({ full_name, email, username, hash, role });

		res.status(201).json({
			message: "User registered successfully",
			user: newUser,
		});
	} catch (error) {
		handleError(res, error);
	}
};

module.exports = { registerUser };
