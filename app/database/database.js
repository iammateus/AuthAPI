const mongoose = require("mongoose");
const status = require("./states");
const databaseConfig = require("./databaseConfig");

const connect = async () => {
    if (isDatabaseConnected()) {
        console.log("database:connect -> MongoDB is connected already");
        return;
    }

    const uri = databaseConfig.getDatabaseUri();
    const options = databaseConfig.getDatabaseConnectionOptions();

    console.log(
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
    return mongoose.connection.readyState === status.CONNECTED;
};

const setMongooseEventHandlers = () => {
    mongoose.connection.on("connected", function () {
        console.log("Mongoose connection was opened successfully.");
    });

    mongoose.connection.on("error", function (error) {
        console.log("A mongoose error has occurred: ", { error });
    });

    mongoose.connection.on("disconnected", function () {
        console.log("Mongoose connection was closed successfully.");
    });
};

module.exports = {
    connect,
    disconnect,
};
