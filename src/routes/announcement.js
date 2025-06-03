const { Router } = require("express");
const {authenticate, authorizeAdmin} = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {postAnnouncement, fetchAnnouncement} = require("../controllers/announcement.controller");
const {announcementSchema} = require("../validators/announcementSchema");
const r = Router();

r.post(
    "/api/admin/announcement",
    authenticate,
    authorizeAdmin,
    validateRequest(announcementSchema),
    postAnnouncement
);

r.get(
    "/api/announcement",
    authenticate,
    fetchAnnouncement
);

module.exports = r;