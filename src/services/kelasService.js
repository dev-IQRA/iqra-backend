const prisma = require("../prisma.js");

const createKelas = async (data) => {
    return prisma.kelas.create({
        data: {
            ...data
        }
    })
};

const findKelasById = async (id) => {
    if (!id) throw new Error("ID is required");
    return prisma.kelas.findUnique({ where: { id } });
};

const viewAllKelas = async () => {
    const kelas = await prisma.kelas.findMany();
    const countKelas = await prisma.kelas.count();

    return {countKelas, kelas};
};

module.exports = {createKelas, findKelasById, viewAllKelas};
