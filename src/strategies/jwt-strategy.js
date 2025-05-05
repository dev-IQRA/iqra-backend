const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const prisma = require("../prisma");
const passport = require("passport");

const cookieExtractor = (req) => {
	if (req?.cookies) {
		return req.cookies.token; // Replace 'token' with the name of your cookie
	}
	return null;
};

const opts = {
	jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
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
	})
);

module.exports = passport;