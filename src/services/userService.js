const prisma = require("../prisma.js");
const { generateRandomUUID } = require("../utils/randomUtils");

const findUserByUsername = async (username) => {
	return prisma.user.findUnique({ where: { username } });
};

const createUser = async (data) => {
	const gen_id = generateRandomUUID();
	return prisma.user.create({ data: { id: gen_id, ...data } });
};

const getAllUsers = async () => {
	return prisma.user.findMany({
		select: {
			id: true,
			username: true,
			full_name: true,
			email: true,
			role: true,
			is_verified: true,
			created_at: true,
			updated_at: true
		}
	});
};

const updateUserStatus = async (userId, isVerified) => {
	return prisma.user.update({
		where: { id: userId },
		data: { is_verified: isVerified },
		select: {
			id: true,
			username: true,
			full_name: true,
			email: true,
			role: true,
			is_verified: true,
			updated_at: true
		}
	});
};

const deleteUser = async (userId) => {
	return prisma.user.delete({
		where: { id: userId }
	});
};

module.exports = { findUserByUsername, createUser, getAllUsers, updateUserStatus, deleteUser };
