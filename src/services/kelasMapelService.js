const prisma = require("../prisma");

const getAllKelasMapel = async () => {
  try {
    return await prisma.kelas_mapel.findMany({
      include: {
        kelas: { select: { id: true, nama_kelas: true, tingkat: true } },
        mapel: { select: { id: true, nama_mapel: true, deskripsi: true } }
      }
    });
  } catch (error) {
    console.error("Error fetching kelas_mapel:", error);
    throw new Error("Failed to fetch kelas_mapel");
  }
};

const createKelasMapel = async (data) => {
  try {
    return await prisma.kelas_mapel.create({
      data: {
        kelas_id: data.kelas_id,
        mapel_id: data.mapel_id
      }
    });
  } catch (error) {
    console.error("Error creating kelas_mapel:", error);
    throw new Error("Failed to create kelas_mapel");
  }
};

const getKelasMapelById = async (id) => {
  try {
    return await prisma.kelas_mapel.findUnique({
      where: { id },
      include: {
        kelas: { select: { id: true, nama_kelas: true, tingkat: true } },
        mapel: { select: { id: true, nama_mapel: true, deskripsi: true } }
      }
    });
  } catch (error) {
    console.error("Error fetching kelas_mapel by ID:", error);
    throw new Error("Failed to fetch kelas_mapel");
  }
};

const updateKelasMapel = async (id, data) => {
  try {
    return await prisma.kelas_mapel.update({
      where: { id },
      data
    });
  } catch (error) {
    console.error("Error updating kelas_mapel:", error);
    throw new Error("Failed to update kelas_mapel");
  }
};

const deleteKelasMapel = async (id) => {
  try {
    return await prisma.kelas_mapel.delete({
      where: { id }
    });
  } catch (error) {
    console.error("Error deleting kelas_mapel:", error);
    throw new Error("Failed to delete kelas_mapel");
  }
};

module.exports = {
  getAllKelasMapel,
  createKelasMapel,
  getKelasMapelById,
  updateKelasMapel,
  deleteKelasMapel
};