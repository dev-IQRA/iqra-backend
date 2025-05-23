const {
  getAllKelasMapel,
  createKelasMapel,
  getKelasMapelById,
  updateKelasMapel,
  deleteKelasMapel
} = require("../services/kelasMapelService");
const handleError = require("../utils/errorHandler");

const viewAllKelasMapel = async (req, res) => {
  try {
    const result = await getAllKelasMapel();
    if (!result || result.length === 0)
      return res.status(404).json({ message: "No kelas_mapel found." });
    return res.status(200).json({ result });
  } catch (err) {
    handleError(res, err);
  }
};

const addKelasMapel = async (req, res) => {
  const { id, kelas_id, mapel_id } = req.body;
  if (!id || !kelas_id || !mapel_id) {
    return res
      .status(400)
      .json({ message: "Field 'id', Kelas ID, dan Mapel ID wajib diberikan." });
  }
  try {
    const result = await createKelasMapel({ id, kelas_id, mapel_id });
    return res.status(201).json({ result });
  } catch (err) {
    handleError(res, err);
  }
};

const getKelasMapelDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getKelasMapelById(id);
    if (!result)
      return res.status(404).json({ message: "Kelas_mapel tidak ditemukan." });
    return res.status(200).json({ result });
  } catch (err) {
    handleError(res, err);
  }
};

const updateKelasMapelData = async (req, res) => {
  const { id } = req.params;
  const { kelas_id, mapel_id } = req.body;
  try {
    const result = await updateKelasMapel(id, { kelas_id, mapel_id });
    return res.status(200).json({ result });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteKelasMapelData = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteKelasMapel(id);
    return res.status(200).json({ message: "Kelas_mapel berhasil dihapus." });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  viewAllKelasMapel,
  addKelasMapel,
  getKelasMapelDetail,
  updateKelasMapelData,
  deleteKelasMapelData
};