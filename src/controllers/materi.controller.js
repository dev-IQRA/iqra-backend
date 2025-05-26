const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Materi: Menambahkan materi baru
exports.createMateri = async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    // Ambil lokasi file jika di-upload
    const fileUrl = req.file ? req.file.path : null;

    const newMateri = await prisma.materi.create({
      data: {
        judul,
        deskripsi,
        fileUrl,
      },
    });
    res.status(201).json({ materi: newMateri });
  } catch (error) {
    console.error("Error creating materi:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get All Materi: Mengambil semua materi
exports.getAllMateri = async (req, res) => {
  try {
    const materiList = await prisma.materi.findMany();
    res.status(200).json({ materi: materiList });
  } catch (error) {
    console.error("Error fetching materi:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Materi Detail: Mengambil detail materi berdasarkan id
exports.getMateriDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const materi = await prisma.materi.findUnique({ where: { id } });
    if (!materi)
      return res.status(404).json({ message: "Materi tidak ditemukan." });
    res.status(200).json({ materi });
  } catch (error) {
    console.error("Error fetching materi detail:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Materi: Mengupdate materi berdasarkan id
exports.updateMateri = async (req, res) => {
  const { id } = req.params;
  try {
    const { judul, deskripsi } = req.body;
    let fileUrl = req.file ? req.file.path : undefined;

    // Siapkan data yang akan diupdate
    let data = { judul, deskripsi };
    if (fileUrl !== undefined) {
      data.fileUrl = fileUrl;
    }
    const updatedMateri = await prisma.materi.update({
      where: { id },
      data: data,
    });
    res.status(200).json({ materi: updatedMateri });
  } catch (error) {
    console.error("Error updating materi:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Materi: Menghapus materi berdasarkan id
exports.deleteMateri = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.materi.delete({ where: { id } });
    res.status(200).json({ message: "Materi berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting materi:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};