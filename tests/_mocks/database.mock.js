const database = require("../../app/database/database");
const {
    mockDatabaseConfig,
    unmockDatabaseConfig,
} = require("./databaseConfig.mock");

const disconnect = () => {};

const mockDatabase = () => {
    mockDatabaseConfig();

    jest.spyOn(database, "disconnect");
    database.disconnect.mockImplementation(disconnect);
};

const unmockDatabase = () => {
    unmockDatabaseConfig();
    database.disconnect.mockRestore();
};

module.exports = { mockDatabase, unmockDatabase };
