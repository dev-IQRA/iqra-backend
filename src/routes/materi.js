const express = require('express');
const router = express.Router();
const multer = require('multer');
const materiController = require('../controllers/materi.controller');

// Konfigurasi multer untuk file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Pastikan folder uploads sudah ada
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Endpoint untuk membuat materi baru
router.post('/', upload.single('file'), materiController.createMateri);

// Endpoint untuk mengambil semua materi
router.get('/', materiController.getAllMateri);

// Endpoint untuk detail materi berdasarkan id
router.get('/:id', materiController.getMateriDetail);

// Endpoint untuk mengupdate materi
router.put('/:id', upload.single('file'), materiController.updateMateri);

// Endpoint untuk menghapus materi
router.delete('/:id', materiController.deleteMateri);

module.exports = router;