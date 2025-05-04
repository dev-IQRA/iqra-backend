const checkEnv = () => {
	const requiredEnvVars = [
		"JWT_TOKEN_SECRET",
		"DATABASE_URL",
		"REFRESH_TOKEN_SECRET",
	];
	const missing = requiredEnvVars.filter((v) => !process.env[v]);
	if (missing.length) {
		console.error(
			`Missing required environment variables: ${missing.join(", ")}`,
		);
		process.exit(1);
	}
	console.log("All required environment variables exists!");
};

module.exports = checkEnv;
