const prisma = require("../prisma");
const { formatTo24Hour } = require("../utils/timeFormatter");

const getAllJadwal = async () => {
  try {
    const jadwal = await prisma.jadwal.findMany({
      include: {
        kelas: { select: { id: true, nama_kelas: true, tingkat: true } },
        mapel: { select: { id: true, nama_mapel: true, deskripsi: true } },
        guru: { select: { id: true, full_name: true, email: true, role: true } }
      }
    });

    return jadwal.map(j => ({
      ...j,
      jam_mulai: formatTo24Hour(j.jam_mulai),
      jam_selesai: formatTo24Hour(j.jam_selesai)
    }));

  } catch (error) {
    console.error("Error fetching jadwal:", error);
    throw new Error("Failed to fetch jadwal");
  }
};


const createJadwal = async (data) => {
  try {
    return await prisma.jadwal.create({
      data: {
        kelas_id: data.kelas_id,
        mapel_id: data.mapel_id,
        guru_id: data.guru_id,         // opsional
        hari: data.hari,
        jam_mulai: new Date(data.jam_mulai),   // pastikan format yang dikirim cocok (ISO string)
        jam_selesai: new Date(data.jam_selesai)
      }
    });
  } catch (error) {
    console.error("Error creating jadwal:", error);
    throw new Error("Failed to create jadwal");
  }
};

const getJadwalById = async (id) => {
  try {
    return await prisma.jadwal.findUnique({
      where: { id },
      include: {
        kelas: { select: { id: true, nama_kelas: true, tingkat: true } },
        mapel: { select: { id: true, nama_mapel: true, deskripsi: true } },
        guru: { select: { id: true, full_name: true } }
      }
    });
  } catch (error) {
    console.error("Error fetching jadwal by ID:", error);
    throw new Error("Failed to fetch jadwal");
  }
};

const updateJadwal = async (id, data) => {
  try {
    return await prisma.jadwal.update({
      where: { id },
      data
    });
  } catch (error) {
    console.error("Error updating jadwal:", error);
    throw new Error("Failed to update jadwal");
  }
};

const deleteJadwal = async (id) => {
  try {
    return await prisma.jadwal.delete({
      where: { id }
    });
  } catch (error) {
    console.error("Error deleting jadwal:", error);
    throw new Error("Failed to delete jadwal");
  }
};

module.exports = {
  getAllJadwal,
  createJadwal,
  getJadwalById,
  updateJadwal,
  deleteJadwal
};