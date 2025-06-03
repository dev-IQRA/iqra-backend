const fs = require("node:fs");
const path = require("node:path");

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
	console.log("Folder uploads berhasil dibuat!");
} else {
	console.log("Folder uploads sudah ada.");
}

module.exports = uploadsDir;
