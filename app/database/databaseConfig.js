const env = require("../helpers/env.helper");

const getDatabaseUri = () => {
    const host = env.get("DB_HOST");
    const port = env.get("DB_PORT");
    const name = env.get("DB_NAME");
    const uri = "mongodb://" + host + ":" + port + "/" + name;
    return uri;
};

const getDatabaseConnectionOptions = () => {
    const user = env.get("DB_USER");
    const pass = env.get("DB_PASS");
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
