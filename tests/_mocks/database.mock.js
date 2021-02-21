const database = require("../../app/database/database");
const {
    mockDatabaseConfig,
    unmockDatabaseConfig,
} = require("./databaseConfig.mock");

const mockDatabaseAndConnect = async () => {
    mockDatabaseConfig();
    await database.connect();
};

const unmockDatabaseAndDisconnect = async () => {
    unmockDatabaseConfig();
    await database.disconnect();
};

module.exports = { mockDatabaseAndConnect, unmockDatabaseAndDisconnect };
