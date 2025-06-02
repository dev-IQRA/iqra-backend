const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const prisma = require("../prisma");
const passport = require("passport");

// Custom extractor untuk mengambil token dari cookie atau header
const customExtractor = (req) => {
	let token = null;

	// Cek di header Authorization
	if (req && req.headers.authorization) {
		const authHeader = req.headers.authorization;
		if (authHeader.startsWith("Bearer ")) {
			token = authHeader.substring(7);
		}
	}

	// Jika tidak ada di header, cek di cookie
	if (!token && req && req.cookies) {
		token = req.cookies.token;
	}

	return token;
};

const opts = {
	jwtFromRequest: customExtractor,
	secretOrKey: process.env.JWT_TOKEN_SECRET,
};

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: jwt_payload.id },
			});
			if (user) return done(null, user);
			return done(null, false);
		} catch (err) {
			return done(err, false);
		}
	}),
);

module.exports = passport;
