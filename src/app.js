const express = require("express");
const { json } = require("express");
const cookieParser = require("cookie-parser");
const passport = require("./strategies/jwt-strategy");
const cors = require("cors");
const checkEnv = require("./utils/checkEnv");
const cookieMiddleware = require("./middleware/cookieMiddleware");
require("dotenv").config();

const routes = require("./routes/index.js");
const helmet = require("helmet");
const app = express();

checkEnv();

//middlewares
app.use(json());
app.use(cookieParser(process.env.SECRET_KEY_SESSION));
app.use(cookieMiddleware);
//ensure env

app.use(passport.initialize());
app.use(routes);

app.use(helmet()); // Add security headers
app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "*",
		credentials: true,
	}),
);
module.exports = app;
