const {
	PrismaClient,
} = require("../prisma/app/generated/prisma/client/client");
// Or, if you revert to the default generator:
// const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
	log:
		process.env.NODE_ENV === "development"
			? ["query", "warn", "error"]
			: ["error"],
});
// Connect with error handling
prisma
	.$connect()
	.then(() => console.log("✅ Connected to the database"))
	.catch((err) => {
		console.error("❌ Database connection failed:", err);
		process.exit(1);
	});
// Graceful disconnect on shutdown
process.on("beforeExit", async () => {
	await prisma.$disconnect();
	console.log("⏹ Disconnected from the database");
});
module.exports = prisma;
