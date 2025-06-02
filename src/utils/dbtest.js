const prisma = require("../prisma");

const testDb = async () => {
    console.log("Waiting for database connection status...")
    try {
        await prisma.$connect();
        console.log("Prisma database connection successful!");
    } catch (err) {
        console.error("Prisma database connection failed:", err.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { testDb };