const databaseConfig = require("../../app/database/databaseConfig");

const getDatabaseUri = () => {
    return global.__MONGO_URI__;
};

const getDatabaseConnectionOptions = () => {
    return {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    };
};

const mockDatabaseConfig = () => {
    jest.spyOn(databaseConfig, "getDatabaseUri");
    databaseConfig.getDatabaseUri.mockImplementation(getDatabaseUri);
    jest.spyOn(databaseConfig, "getDatabaseConnectionOptions");
    databaseConfig.getDatabaseConnectionOptions.mockImplementation(
        getDatabaseConnectionOptions
    );
};

module.exports = { mockDatabaseConfig };
