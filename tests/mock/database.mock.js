const mongoose = require("mongoose");
const { log, error } = console;

const connect = async () => {
    await mongoose.connect(
        global.__MONGO_URI__,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        },
        (err) => {
            if (err) {
                error(err);
                process.exit(1);
            }
        }
    );
    log("databaseMock:connect -> Connecting to MongoDB Memory Server");
};

const disconnect = async () => {
    log(
        "databaseMock:disconnect -> MongoDB Memory Server was disconnected successfully"
    );
};

mongoose.connection.on("connected", () => {
    log("databaseMock -> Connected to MongoDB Memory Server");
});

mongoose.connection.on("error", () => {
    log("databaseMock -> Connection error", { error });
});

module.exports = { connect, disconnect };
