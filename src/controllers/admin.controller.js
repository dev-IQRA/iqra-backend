const { findUserByEmail, createUser, findUserByUsername, getAllUsers, updateUserStatus, deleteUser, getOnlineUsers, cleanupInactiveUsers } = require("../services/userService");
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

const getUsers = async (req, res) => {
	try {
		const users = await getAllUsers();
		res.status(200).json({
			message: "Users retrieved successfully",
			users: users,
		});
	} catch (error) {
		handleError(res, error);
	}
};

const updateUser = async (req, res) => {
	const { userId } = req.params;
	const { is_verified } = req.body;

	try {
		const updatedUser = await updateUserStatus(userId, is_verified);
		res.status(200).json({
			message: "User updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		handleError(res, error);
	}
};

const removeUser = async (req, res) => {
	const { userId } = req.params;

	try {
		await deleteUser(userId);
		res.status(200).json({
			message: "User deleted successfully",
		});
	} catch (error) {
		handleError(res, error);
	}
};

const getOnlineUsersList = async (req, res) => {
	try {
		console.log("Getting online users list...");
		// Cleanup inactive users terlebih dahulu
		await cleanupInactiveUsers();
		
		const onlineUsers = await getOnlineUsers();
		console.log(`Found ${onlineUsers.length} online users:`, onlineUsers.map(u => u.username));
		res.status(200).json({
			message: "Online users retrieved successfully",
			users: onlineUsers,
		});
	} catch (error) {
		console.error("Error getting online users:", error);
		handleError(res, error);
	}
};

module.exports = { registerUser, getUsers, updateUser, removeUser, getOnlineUsersList };
