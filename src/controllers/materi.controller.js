const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Materi: Menambahkan materi baru
exports.createMateri = async (req, res) => {
  try {
    // Ambil data dari req.body. Pastikan client juga mengirim 'guru_id' dan 'mapel_id'
    const { judul, deskripsi, guru_id, mapel_id } = req.body;
    if (!judul) {
      return res.status(400).json({ message: "Field 'judul' harus disediakan." });
    }
    if (!guru_id) {
      return res.status(400).json({ message: "Field 'guru_id' harus disediakan." });
    }
    if (!mapel_id) {
      return res.status(400).json({ message: "Field 'mapel_id' harus disediakan." });
    }

    // Ambil lokasi file jika di-upload
    const file_url = req.file ? req.file.path : null;

    const newMateri = await prisma.materi.create({
      data: {
        judul,
        deskripsi,
        file_url,
        guru_id,    // Relasi ke user (guru)
        mapel_id,   // Relasi ke mapel (subjek)
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
    const materiList = await prisma.materi.findMany({
      include: {
        guru: true,  // Mengikutsertakan data guru (opsional: sesuaikan dengan kebutuhan)
        mapel: true, // Mengikutsertakan data mapel
      }
    });
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
    const materi = await prisma.materi.findUnique({
      where: { id },
      include: { 
        guru: true,
        mapel: true
      }
    });
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
    // Ambil nilai baru dari req.body (termasuk option update untuk guru_id/mapel_id jika perlu)
    const { judul, deskripsi, guru_id, mapel_id } = req.body;
    const file_url = req.file ? req.file.path : undefined;

    // Siapkan data yang akan diupdate
    let data = { judul, deskripsi, guru_id, mapel_id };
    if (file_url !== undefined) {
      data.file_url = file_url;
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