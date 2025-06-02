const prisma = require("../prisma");

const testDbConnection = async () => {
    try {
        await prisma.$connect();
        console.log("Database connection successful.");
    } catch (error) {
        console.error("Database connection failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {testDbConnection}