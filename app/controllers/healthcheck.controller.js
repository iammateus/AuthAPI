const mongoose = require("mongoose");
const status = require("../../app/database/states");

const healthcheck = async (req, res, next) => {
    res.json({
        message: "The server is running (Auth API)",
        mongodb: {
            connection:
                mongoose.connection.readyState === status.CONNECTED
                    ? "connected"
                    : "disconnect",
        },
    });
};

module.exports = {
    healthcheck,
};
