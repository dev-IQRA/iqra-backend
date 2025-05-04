const crypto = require("node:crypto");

const generateRandomString = (length) => {
	return crypto.randomBytes(length).toString("hex").slice(0, length);
};

const generateRandomNumber = (min, max) => {
	return crypto.randomInt(min, max + 1);
};

const generateRandomUUID = () => {
	return crypto.randomUUID();
};

module.exports = {
	generateRandomString,
	generateRandomNumber,
	generateRandomUUID,
};
