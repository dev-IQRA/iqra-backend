const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../services/userService");
const { verifyPassword } = require("../utils/passwordUtils");
const handleError = require("../utils/errorHandler");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user || !(await verifyPassword(user.hash, password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: "24h" }
        );

        res.json({ token });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = { login };