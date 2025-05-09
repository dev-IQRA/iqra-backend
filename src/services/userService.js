const prisma = require("../prisma.js");
const { generateRandomUUID } = require("../utils/randomUtils");

const findUserByUsername = async (username) => {
	return prisma.user.findUnique({ where: { username } });
};

const createUser = async (data) => {
	const gen_id = generateRandomUUID();
	return prisma.user.create({ data: { id: gen_id, ...data } });
};

module.exports = { findUserByUsername, createUser };
