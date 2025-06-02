const { updateUserOnlineStatus } = require("../services/userService");

const updateLastActivity = async (req, res, next) => {
	try {
		// Jika user sudah ter-autentikasi, update last activity
		if (req.user?.id) {
			console.log(
				`Updating activity for user ${req.user.username} (ID: ${req.user.id})`,
			);
			// Update last activity tanpa menunggu response (fire and forget)
			updateUserOnlineStatus(req.user.id, true).catch((err) => {
				console.error("Failed to update user activity:", err);
			});
		}
		next();
	} catch (error) {
		// Jangan block request jika gagal update activity
		console.error("Activity middleware error:", error);
		next();
	}
};

module.exports = { updateLastActivity };
