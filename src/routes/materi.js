const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("node:path");
const materiController = require("../controllers/materi.controller");

// Error handling middleware for multer
const handleUploadErrors = (error, req, res, next) => {
	if (error instanceof multer.MulterError) {
		if (error.code === "LIMIT_FILE_SIZE") {
			return res
				.status(400)
				.json({ message: "File too large. Maximum size is 10MB." });
		}
		return res
			.status(400)
			.json({ message: `Upload error: ${error.message}` });
	}
	if (error) {
		return res.status(400).json({ message: error.message });
	}
	next();
};

// Konfigurasi multer untuk file upload
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Pastikan folder uploads sudah ada
	},
	filename: (req, file, cb) => {
		const crypto = require("crypto");
		const ext = path.extname(file.originalname);
		const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(16).toString("hex")}`;
		cb(null, `${uniqueSuffix}${ext}`);
	},
});
const upload = multer({
	storage,
	limits: {
		fileSize: 10 * 1024 * 1024, // 10MB limit
	},
	fileFilter: (req, file, cb) => {
		const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
		const extname = allowedTypes.test(
			path.extname(file.originalname).toLowerCase(),
		);
		const mimetype = allowedTypes.test(file.mimetype);

		if (mimetype && extname) {
			return cb(null, true);
		}
		cb(new Error("Only images and documents are allowed"));
	},
});

// Endpoint untuk membuat materi baru
router.post(
	"/",
	upload.single("file"),
	handleUploadErrors,
	materiController.createMateri,
);

// Endpoint untuk mengambil semua materi
router.get("/", materiController.getAllMateri);

// Endpoint untuk detail materi berdasarkan id
router.get("/:id", materiController.getMateriDetail);

// Endpoint untuk mengupdate materi
router.put(
	"/:id",
	upload.single("file"),
	handleUploadErrors,
	materiController.updateMateri,
);

// Endpoint untuk menghapus materi
router.delete("/:id", materiController.deleteMateri);

module.exports = router;
