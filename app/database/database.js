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

    log("database -> Connecting to Mongodb with the following config", {
        uri,
        user,
        pass,
    });
};

const disconnect = async () => {
    await mongoose.connection.close();
    log("database -> MongoDB was disconnected successfully");
};

module.exports = { connect, disconnect };
