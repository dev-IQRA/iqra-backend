const { viewAllMapel: fetchAllMapel, findMapelById, createMapel: createMapelService } = require("../services/mapelService");
const handleError = require("../utils/errorHandler");

const viewAllMapel = async (req, res) => {
    try {
        const result = await fetchAllMapel();
        if (!result || result.mapel.length === 0) {
            return res.status(404).json({ message: "No mapel found." });
        }
        return res.status(200).json({ result });
    } catch (err) {
        handleError(res, err);
    }
};

const viewMapelById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await findMapelById(id);

        if (!result) return res.status(404).json({ message: "Mapel not found." });

        return res.status(200).json({ result });
    } catch (err) {
        handleError(res, err);
    }
};

const createMapel = async (req, res) => {
    const { id, nama_mapel, deskripsi } = req.body;

    if (!id || !nama_mapel || !deskripsi) {
        return res.status(400).json({ message: "Invalid input: All fields are required." });
    }

    try {
        const existingMapel = await findMapelById(id);
        if (existingMapel) return res.status(409).json({ message: "This mapel already exists." });

        const result = await createMapelService({ id, nama_mapel, deskripsi });
        return res.status(201).json({ result });
    } catch (err) {
        handleError(res, err);
    }
};

module.exports = { viewAllMapel, viewMapelById, createMapel };