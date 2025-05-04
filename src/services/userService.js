const prisma = require("../prisma.js");

const findUserByEmail = async (email) => {
    return prisma.user.findUnique({ where: { email } });
};

const createUser = async (data) => {
    return prisma.user.create({ data });
};

module.exports = { findUserByEmail, createUser };