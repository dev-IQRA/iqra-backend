// File: initUploads.js
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Folder uploads berhasil dibuat!');
} else {
  console.log('Folder uploads sudah ada.');
}

module.exports = uploadsDir;