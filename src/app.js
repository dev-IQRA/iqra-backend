const express = require("express");
const { json } = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("@dotenvx/dotenvx/config");

const routes = require("./routes/index.js");
const app = express();

//middlewares
app.use(json());
app.use(cookieParser(process.env.SECRET_KEY_SESSION));
app.use(routes);

module.exports = app;
