const { Router } = require("express");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const kelasRouter = require("./kelas");

const router = Router();

router.use(authRouter);
router.use(adminRouter);
router.use(kelasRouter);

router.get("/", (req, res) => {
	res.status(200).send("OK");
});

module.exports = router;
