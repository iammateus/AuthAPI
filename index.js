/**
 * Booting dotenv
 */
require("dotenv").config();

const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
} = require("http-status-codes");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./app/routes/router");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

/**
 * 404 handler
 */
app.use(function (req, res, next) {
    res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
    });
});

/**
 * Error handler
 */
app.use(async function (err, req, res, next) {
    // set locals, only providing error in development
    console.error("Error handler -> ", {
        error: err,
    });
    const error = req.app.get("env") === "development" ? err : {};
    res.locals.message = err.message;
    res.locals.error = error;

    const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
        message:
            req.app.get("env") === "development"
                ? err.message
                : getReasonPhrase(statusCode),
        error,
    });
});

module.exports = app;
