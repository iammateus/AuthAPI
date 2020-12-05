const mongoose = require("mongoose");
const { log } = console;
const databaseConfig = require("./databaseConfig");

const connect = async () => {
    if (isDatabaseConnected()) {
        log("database:connect -> MongoDB is connected already");
        return;
    }

    const uri = databaseConfig.getDatabaseUri();
    const options = databaseConfig.getDatabaseConnectionOptions();

    log(
        "database:connect -> Trying to connect with MongoDB with the following configuration",
        {
            uri,
            options,
        }
    );

    setMongooseEventHandlers();
    await mongoose.connect(uri, options);
};

const disconnect = async () => {
    await mongoose.connection.close();
};

const isDatabaseConnected = () => {
    return mongoose.connection.readyState === 1;
};

const setMongooseEventHandlers = () => {
    mongoose.connection.on("connected", function () {
        log("Mongoose connection was opened successfully.");
    });

    mongoose.connection.on("error", function (error) {
        log("A mongoose error has occurred: ", { error });
    });

    mongoose.connection.on("disconnected", function () {
        log("Mongoose connection was closed successfully.");
    });
};

module.exports = {
    connect,
    disconnect,
};
