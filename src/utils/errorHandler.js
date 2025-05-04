const handleError = (res, error, statusCode = 500, message = "Internal server error") => {
    // In production, limit what gets logged to avoid exposing sensitive data
    if (process.env.NODE_ENV === 'production') {
        console.error(`Error: ${message}, Status: ${statusCode}`);
    } else {
        console.error(error);
    }
    res.status(statusCode).json({ message });
};
module.exports = handleError;