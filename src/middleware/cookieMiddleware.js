const cookieMiddleware = (req, res, next) => {
    const originalCookie = res.cookie.bind(res);
    res.cookie = (name, value, options = {}) => {
        const defaultOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };
        originalCookie(name, value, { ...defaultOptions, ...options });
    };
    next();
};

module.exports = cookieMiddleware;