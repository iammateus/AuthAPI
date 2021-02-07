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

const unmockDatabaseConfig = () => {
    databaseConfig.getDatabaseUri.mockRestore();
    databaseConfig.getDatabaseConnectionOptions.mockRestore();
};

module.exports = { mockDatabaseConfig, unmockDatabaseConfig };
