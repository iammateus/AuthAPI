const mongoose = require("mongoose");

const connect = () => {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const dbName = process.env.DB_NAME;
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;

    const uri = "mongodb://" + host + ":" + port + "/" + dbName;

    console.log("Connecting to Mongodb with the following config", {
        uri,
        user,
        pass,
    });

    mongoose.connect(uri, {
        auth: { authSource: "admin" },
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: user,
        pass: pass,
    });
};

const disconnect = () => {
    mongoose.connection.close();
};

module.exports = { connect, disconnect };
