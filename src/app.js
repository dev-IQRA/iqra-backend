const express = require("express");
const { json } = require("express");
const cookieParser = require("cookie-parser");
const passport = require("./strategies/jwt-strategy");
const cors = require("cors");
const checkEnv = require("./utils/checkEnv");
const cookieMiddleware = require("./middleware/cookieMiddleware");
require("dotenv").config();

const app = express();

//ensure env
checkEnv();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173", // sesuaikan
  credentials: true
}));

const routes = require("./routes/index.js");
const helmet = require("helmet");

//middlewares
app.use(json());
app.use(cookieParser(process.env.SECRET_KEY_SESSION));
app.use(cookieMiddleware);


app.use(passport.initialize());
app.use(routes);

app.use(helmet()); // Add security headers

module.exports = app;
