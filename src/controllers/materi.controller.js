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

    // Validate foreign key existence
    const [guru, mapel] = await Promise.all([
      prisma.user.findUnique({ where: { id: guru_id } }),
      prisma.mapel.findUnique({ where: { id: mapel_id } })
    ]);

    if (!guru) {
      return res.status(400).json({ message: "Guru dengan ID tersebut tidak ditemukan." });
    }
    if (!mapel) {
      return res.status(400).json({ message: "Mapel dengan ID tersebut tidak ditemukan." });
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
    // Clean up uploaded file if database operation fails
    if (req.file && req.file.path) {
      const fs = require('fs').promises;
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error("Error cleaning up file:", unlinkError);
      }
    }
    
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Data dengan nilai tersebut sudah ada.' });
    }
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
    // Check if materi exists
    const existingMateri = await prisma.materi.findUnique({ where: { id } });
    if (!existingMateri) {
      return res.status(404).json({ message: "Materi tidak ditemukan." });
    }
    
    // Ambil nilai baru dari req.body (termasuk option update untuk guru_id/mapel_id jika perlu)
    const { judul, deskripsi, guru_id, mapel_id } = req.body;
    const file_url = req.file ? req.file.path : undefined;

    // Siapkan data yang akan diupdate
    const data = { judul, deskripsi, guru_id, mapel_id };
    if (file_url !== undefined) {
      data.file_url = file_url;
    }

    // Remove undefined values to avoid overwriting with null
    Object.keys(data).forEach(key => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    const updatedMateri = await prisma.materi.update({
      where: { id },
      data: data,
    });
    res.status(200).json({ materi: updatedMateri });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Materi tidak ditemukan." });
    }
    console.error("Error updating materi:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Materi: Menghapus materi berdasarkan id
exports.deleteMateri = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if materi exists and get file path for cleanup
    const existingMateri = await prisma.materi.findUnique({ where: { id } });
    if (!existingMateri) {
      return res.status(404).json({ message: "Materi tidak ditemukan." });
    }

    await prisma.materi.delete({ where: { id } });

    // Clean up associated file if it exists
    if (existingMateri.file_url) {
      const fs = require('fs').promises;
      try {
        await fs.unlink(existingMateri.file_url);
      } catch (unlinkError) {
        console.error("Error cleaning up file:", unlinkError);
        // Don't fail the request if file cleanup fails
      }
    }

    res.status(200).json({ message: "Materi berhasil dihapus" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Materi tidak ditemukan." });
    }
    console.error("Error deleting materi:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};