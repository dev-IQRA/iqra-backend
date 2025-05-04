const { findUserByEmail, createUser } = require("../services/userService");
const { hashPassword } = require("../utils/passwordUtils");
const handleError = require("../utils/errorHandler");

const registerUser = async (req, res) => {
    const { full_name ,email, password, role } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hash = await hashPassword(password);
        const newUser = await createUser({full_name, email, hash, role });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = { registerUser };