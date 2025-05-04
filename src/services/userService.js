const prisma = require("../prisma.js");
const { generateRandomUUID } = require("../utils/randomUtils");

const findUserByEmail = async (email) => {
	return prisma.user.findUnique({ where: { email } });
};

const createUser = async (data) => {
	const gen_id = generateRandomUUID();
	return prisma.user.create({ data: { id: gen_id, ...data } });
};

module.exports = { findUserByEmail, createUser };
