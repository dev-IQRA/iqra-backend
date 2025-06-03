const prisma = require("../prisma");
const handleError = require("../utils/errorHandler");

const postAnnouncement = async (req, res) => {
    const {title, body} = req.body;
    try {
        const result = await prisma.announcement.create({
            data: {
                title,
                body
            }
        })

        res.status(201).json(result);
    } catch (e) {
        handleError(res, e);
    }
}

const fetchAnnouncement = async (req, res) => {
    try {
        const result = await prisma.announcement.findMany();
        res.status(200).json(result);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {postAnnouncement, fetchAnnouncement}