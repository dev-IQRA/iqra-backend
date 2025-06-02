const prisma = require("../prisma.js");

const createKelas = async (data) => {
	return prisma.kelas.create({
		data: {
			...data,
		},
	});
};

const findKelasById = async (id) => {
	if (!id) throw new Error("ID is required");
	return prisma.kelas.findUnique({ where: { id } });
};

const viewAllKelas = async (
	page = 1,
	limit = 10,
	sortBy = "nama_kelas",
	order = "asc",
) => {
	const skip = (page - 1) * limit;
	const orderBy = { [sortBy]: order };
	const kelas = await prisma.kelas.findMany({
		skip,
		take: limit,
		orderBy,
	});
	const countKelas = await prisma.kelas.count();

	return {
		countKelas,
		kelas,
		totalPages: Math.ceil(countKelas / limit),
		currentPage: page,
	};
};

module.exports = { createKelas, findKelasById, viewAllKelas };
