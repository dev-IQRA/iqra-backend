const prisma = require("../prisma.js");

const createMapel = async (data) => {
	try {
		return await prisma.mapel.create({ data });
	} catch (error) {
		console.error("Error creating mapel:", error);
		throw new Error("Failed to create mapel");
	}
};

const findMapelById = async (id) => {
	try {
		return await prisma.mapel.findUnique({ where: { id } });
	} catch (error) {
		console.error("Error finding mapel by ID:", error);
		throw new Error("Failed to find mapel");
	}
};

const viewAllMapel = async () => {
	try {
		const [mapel, countMapel] = await Promise.all([
			prisma.mapel.findMany(),
			prisma.mapel.count(),
		]);
		return { countMapel, mapel };
	} catch (error) {
		console.error("Error fetching all mapel:", error);
		throw new Error("Failed to fetch mapel");
	}
};

module.exports = { createMapel, findMapelById, viewAllMapel };
