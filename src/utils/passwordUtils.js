const argon2 = require("argon2");

const hashPassword = async (password) => {
    try {
        return await argon2.hash(password);
    } catch (error) {
        throw new Error("Error hashing password");
    }
};

const verifyPassword = async (hash, password) => {
    try {
        return await argon2.verify(hash, password);
    } catch (error) {
        throw new Error("Error verifying password");
    }
};

module.exports = { hashPassword, verifyPassword };