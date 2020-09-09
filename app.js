const createError = require("http-errors");
const cookieSession = require("cookie-session");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("./config");
const mongoose = require("mongoose");
/*connection with data base*/
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*connection error*/
const db = mongoose.connection;
db.on("err", console.error.bind(console, "connection error"));

const indexRouter = require("./routes/index");
const newsRouter = require("./routes/news");
const adminRouter = require("./routes/admin");
const quizRouter = require("./routes/quiz");
const apiRouter = require("./routes/api");

const app = express();

/*cookies*/
app.use(
  cookieSession({
    name: "session",
    keys: config.keys,
    maxAge: config.maxAge,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*handle add class for active nav element*/
app.use((req, res, next) => {
  res.locals.path = req.path;

  next();
});

app.use("/", indexRouter);
app.use("/news", newsRouter);
app.use("/admin", adminRouter);
app.use("/quiz", quizRouter);
app.use("/api", apiRouter);

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
});

module.exports = app;
