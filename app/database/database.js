const mongoose = require("mongoose");
const { log } = console;

const env = () => {
    return process.env.APP_ENV;
};

const connect = async () => {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const name = process.env.DB_NAME;
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;
    const uri =
        env() === "test"
            ? global.__MONGO_URI__
            : "mongodb://" + host + ":" + port + "/" + name;

    if (isDatabaseConnected()) {
        log("database:connect -> MongoDB is connected already");
        return;
    }

    let options =
        env() === "test"
            ? {
                  useNewUrlParser: true,
                  useCreateIndex: true,
                  useUnifiedTopology: true,
              }
            : {
                  auth: {
                      authSource: "admin",
                  },
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
                  user,
                  pass,
              };

    log("database:connect -> Connecting to MongoDB", {
        uri,
        options,
    });

    await mongoose.connect(uri, options);
};

const disconnect = async () => {
    // await mongoose.connection.close();
    log("database:disconnect -> MongoDB was disconnected successfully");
};

const isDatabaseConnected = () => {
    return mongoose.connection.readyState === 1;
};

mongoose.connection.on("connected", () => {
    log("database -> Connected to Mongodb with the following config");
});

mongoose.connection.on("error", (error) => {
    log("database -> Connection error", { error });
});

module.exports = { connect, disconnect };
