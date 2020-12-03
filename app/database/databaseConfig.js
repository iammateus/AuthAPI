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

module.exports = {
    getDatabaseConnectionOptions,
    getDatabaseUri,
};
