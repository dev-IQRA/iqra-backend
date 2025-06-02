// src/utils/timeformatter.js
const formatTo24Hour = (input) => {
	// Tangani jika input null, undefined, atau kosong
	if (!input) return "N/A";

	// Coba parsing menggunakan Date
	const date = new Date(input);
	if (!Number.isNaN(date.getTime())) {
		return date.toLocaleTimeString("id-ID", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
	}

	// Jika tidak valid sebagai tanggal ISO, periksa apakah hanya merupakan waktu (misalnya "15.00" atau "16.30")
	// Regex: satu atau dua digit, diikuti titik atau titik dua, kemudian dua digit
	const timePattern = /^(\d{1,2})[.:](\d{2})$/;
	const match = timePattern.exec(input);
	if (match) {
		// Ambil jam dan menit
		const hours = match[1].padStart(2, "0");
		const minutes = match[2];
		// Kembalikan dalam format "HH:mm"
		return `${hours}:${minutes}`;
	}

	// Jika tidak sesuai sama sekali, kembalikan fallback
	return "N/A";
};

module.exports = { formatTo24Hour };
