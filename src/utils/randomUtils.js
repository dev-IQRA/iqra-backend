const crypto = require("node:crypto");

const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString("hex").slice(0, length);
};

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomUUID = () => {
    return crypto.randomUUID();
};

module.exports = { generateRandomString, generateRandomNumber, generateRandomUUID };