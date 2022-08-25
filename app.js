require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

//middleware imports
const allowOnlyGETrequests = require("./middlewares/allowOnlyGETrequests");
const printHelloWorld = require("./middlewares/printHelloWorld");
const errorHandler = require("./middlewares/errorHandler");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");
const app = express();

app.use(printHelloWorld);

//binds the allowOnlyGETrequests to every request made on path /get-only
app.use("/get-only", allowOnlyGETrequests, (req, res) =>
  res.send("Correct method")
);

app.use(logger("dev"));

// App-level BUILT-IN middleware to parse the body of incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//binds moviesRouter to every request at path starting with /movies
app.use("/api/movies", moviesRouter);

//binds custom error handler to every reqeust made to our app, must be the last one declared in the app-level middleware stack
app.use(errorHandler);

module.exports = app;
