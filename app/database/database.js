const mongoose = require("mongoose");
const { log } = console;

const connect = async () => {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const name = process.env.DB_NAME;
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;

    const uri = "mongodb://" + host + ":" + port + "/" + name;

    await mongoose.connect(uri, {
        auth: { authSource: "admin" },
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user,
        pass,
    });

    log("database:connect -> Connecting to MongoDB");
};

const disconnect = async () => {
    await mongoose.connection.close();
    log("database:disconnect -> MongoDB was disconnected successfully");
};

mongoose.connection.on("connected", () => {
    log("database -> Connected to Mongodb with the following config");
});

mongoose.connection.on("error", () => {
    log("database -> Connection error", { error });
});

module.exports = { connect, disconnect };
