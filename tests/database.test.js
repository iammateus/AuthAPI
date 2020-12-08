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

    it("should return undefined and not try to connect again", async () => {
        jest.spyOn(mongoose, "connect");
        mongoose.connect = jest.fn();
        const result = await connect();
        expect(result).toEqual(undefined);
        expect(mongoose.connect.mock.calls.length).toEqual(0);
    });

    afterAll(async () => {
        await disconnect();
    });
});
