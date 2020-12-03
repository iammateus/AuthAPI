const mongoose = require("mongoose");
const database = require("../../app/database/database");
const { log } = console;

const connect = async () => {
    const uri = global.__MONGO_URI__;
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    };
    await mongoose.connect(uri, options);
    log(
        "database:connect -> Trying to connect with MongoDB with the following configuration",
        {
            uri,
            options,
        }
    );
};

const mockDatabase = () => {
    console.log("mocking database");
    jest.spyOn(database, "connect");
    database.connect.mockImplementation(connect);
    jest.spyOn(database, "disconnect");
    database.disconnect.mockImplementation(() => null);
};

module.exports = { connect, mockDatabase };
