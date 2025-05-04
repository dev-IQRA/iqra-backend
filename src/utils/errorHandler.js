const handleError = (res, error, statusCode = 500, message = "Internal server error") => {
    console.error(error);
    res.status(statusCode).json({ message });
};

module.exports = handleError;