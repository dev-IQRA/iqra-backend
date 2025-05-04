const express = require("express");
const { json } = require("express");
const cookieParser = require("cookie-parser");
const passport = require("./strategies/jwt-strategy");

require("dotenv").config();

const routes = require("./routes/index.js");
const app = express();

//middlewares
app.use(json());
app.use(cookieParser(process.env.SECRET_KEY_SESSION));
app.use(passport.initialize());
app.use(routes);

module.exports = app;
