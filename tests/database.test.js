const mongoose = require("mongoose");
const status = require("../app/database/states");
const { connect, disconnect } = require("../app/database/database");
const { mockDatabaseConfig } = require("./mocks/databaseConfig.mock");

describe("database:connect", () => {
    beforeAll(() => {
        mockDatabaseConfig();
    });

    it("should be a function", () => {
        expect(connect).toBeInstanceOf(Function);
    });

    it("should create mongo connection", async () => {
        await connect();
        expect(mongoose.connection.readyState).toEqual(status.CONNECTED);
    });

    afterAll(async () => {
        await disconnect();
    });
});
