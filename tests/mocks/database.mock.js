const database = require("../../app/database/database");

const disconnect = () => {};

const mockDatabase = () => {
    jest.spyOn(database, "disconnect");
    database.disconnect.mockImplementation(disconnect);
};

module.exports = { mockDatabase };
