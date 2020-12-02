const mongoose = require("mongoose");
const { log } = console;

const getDatabaseUri = () => {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const name = process.env.DB_NAME;
    const uri = "mongodb://" + host + ":" + port + "/" + name;
    return uri;
};

const getDatabaseConnectionOptions = () => {
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;
    const options = {
        auth: {
            authSource: "admin",
        },
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user,
        pass,
    };
    return options;
};

const connect = async () => {
    if (isDatabaseConnected()) {
        log("database:connect -> MongoDB is connected already");
        return;
    }

    const uri = getDatabaseUri();
    const options = getDatabaseConnectionOptions();

    log(
        "database:connect -> Trying to connect with MongoDB with the following configuration",
        {
            uri,
            options,
        }
    );

    await mongoose.connect(uri, options);
    setMongooseEventHandlers();
};

const disconnect = async () => {
    // await mongoose.connection.close();
    log("database:disconnect -> MongoDB was disconnected successfully");
};

const isDatabaseConnected = () => {
    return mongoose.connection.readyState === 1;
};

const setMongooseEventHandlers = () => {
    mongoose.connection.on("connected", function () {
        log("MongoDB is connected.");
    });

    mongoose.connection.on("error", function (error) {
        log("A MongoDB error occurred", { error });
    });

    mongoose.connection.on("disconnected", function () {
        log(disconnected("MongoDB is disconnected"));
    });

    process.on("SIGINT", function () {
        mongoose.connection.close(function () {
            console.log(
                "Mongoose default connection is disconnected due to application termination"
            );
            process.exit(0);
        });
    });
};

module.exports = {
    connect,
    disconnect,
    getDatabaseConnectionOptions,
    getDatabaseUri,
};
