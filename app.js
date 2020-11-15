const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
} = require("http-status-codes");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const indexRouter = require("./app/routes/index");

const app = express();

const uri = "mongodb://mongo:27017/canvas-api";
mongoose.connect(uri, {
    auth: { authSource: "admin" },
    user: "root",
    pass: "docker",
});

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// 404 handler
app.use(function (req, res, next) {
    res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
    });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
        message: getReasonPhrase(statusCode),
    });
});

module.exports = app;
