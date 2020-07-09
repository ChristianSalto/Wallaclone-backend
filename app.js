var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");

var app = express();

// conexion a la base de datos
require("./lib/connectMongoose");

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").__express);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const jwtAuth = require("./middleware/jwtAuth");

/**
 * Rutas del api
 */

/**
 * Rutas del website
 */

app.use("/", require("./routes/index"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/recoverpass", require("./routes/recoverPass"));
app.use("/newpass", require("./routes/recoverPass"));

app.use("/adsview", require("./routes/adsView"));
app.use("/details", require("./routes/details"));
app.use("/privatezone", jwtAuth(), require("./routes/privateZone"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  //res.send(err.message)
});

module.exports = app;
