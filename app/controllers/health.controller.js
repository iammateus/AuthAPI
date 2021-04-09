const mongoose = require("mongoose");
const status = require("../../app/database/states");

const health = async (req, res, next) => {
    res.json({
        message: "The application is running (Auth API)",
        mongodb: {
            connection:
                mongoose.connection.readyState === status.CONNECTED
                    ? "connected"
                    : "disconnect",
        },
    });
};

module.exports = {
    health,
};
