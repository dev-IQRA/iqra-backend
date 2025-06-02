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

const updateUserOnlineStatus = async (userId, isOnline) => {
	return prisma.user.update({
		where: { id: userId },
		data: { 
			is_online: isOnline,
			last_activity: new Date()
		}
	});
};

const getOnlineUsers = async () => {
	// Ambil users yang benar-benar online (hapus filter is_verified untuk sementara)
	return prisma.user.findMany({
		where: {
			is_online: true
		},
		select: {
			id: true,
			username: true,
			full_name: true,
			role: true,
			nis: true,
			nip: true,
			last_activity: true,
			updated_at: true
		},
		orderBy: {
			last_activity: 'desc'
		},
		take: 15 // Batasi 15 user online
	});
};

// Fungsi untuk cleanup user yang sudah tidak aktif (offline otomatis setelah 15 menit)
const cleanupInactiveUsers = async () => {
	const fifteenMinutesAgo = new Date();
	fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15);
	
	return prisma.user.updateMany({
		where: {
			is_online: true,
			last_activity: {
				lt: fifteenMinutesAgo
			}
		},
		data: {
			is_online: false
		}
	});
};

module.exports = { findUserByUsername, createUser, getAllUsers, updateUserStatus, deleteUser, getOnlineUsers, updateUserOnlineStatus, cleanupInactiveUsers };
