const Joi = require("joi");

const announcementSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    body: Joi.string().min(1).required(),
});

module.exports = { announcementSchema };