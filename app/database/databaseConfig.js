const env = require("../helpers/env.helper");

const getDatabaseUri = () => {
    const host = env("DB_HOST");
    const port = env("DB_PORT");
    const name = env("DB_NAME");
    const uri = "mongodb://" + host + ":" + port + "/" + name;
    return uri;
};

const getDatabaseConnectionOptions = () => {
    const user = env("DB_USER");
    const pass = env("DB_PASS");
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

module.exports = {
    getDatabaseConnectionOptions,
    getDatabaseUri,
};
