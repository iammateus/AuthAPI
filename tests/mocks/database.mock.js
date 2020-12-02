const mongoose = require("mongoose");
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

module.exports = { connect };
