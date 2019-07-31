const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");

const index = require("./routes/index");
// const users = require("./routes/users");
const notes = require("./routes/notes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "partials"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/assets/vendor/bootstrap/js",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap", "dist", "js")
  )
);
app.use(
  "/assets/vendor/bootstrap/css",
  express.static(path.join(__dirname, "minty"))
);
app.use(
  "/assets/vendor/jquery",
  express.static(path.join(__dirname, "node_modules", "jquery"))
);
app.use(
  "/assets/vendor/popper.js",
  express.static(path.join(__dirname, "node_modules", "popper.js", "dist"))
);
app.use(
  "/assets/vendor/feather-icons",
  express.static(path.join(__dirname, "node_modules", "feather-icons", "dist"))
);

app.use("/", index);
// app.use("/users", users);
app.use("/notes", notes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
