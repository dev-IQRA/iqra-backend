const express = require("express");
const path = require("node:path");
const { Router } = require("express");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const kelasRouter = require("./kelas");
const mapelRouter = require("./mapel");
const kelasMapelRouter = require("./kelasMapel");
const jadwalRouter = require("./jadwal");
const materiRoutes = require("./materi");
const announcementRoutes = require("./announcement");
const router = Router();

router.use(authRouter);
router.use(adminRouter);
router.use(kelasRouter);
router.use(mapelRouter);
router.use(kelasMapelRouter);
router.use(jadwalRouter);
router.use(announcementRoutes);
router.use("/api/materi", materiRoutes);
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

router.get("/", (req, res) => {
	res.status(200).send("OK");
});

module.exports = router;
