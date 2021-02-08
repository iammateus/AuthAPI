const mongoose = require("mongoose");
const status = require("../../app/database/states");
const { connect, disconnect } = require("../../app/database/database");
const {
    mockDatabaseConfig,
    unmockDatabaseConfig,
} = require("../_mocks/databaseConfig.mock");

describe("connect", () => {
    beforeAll(() => {
        mockDatabaseConfig();
    });

    it("should be a function", () => {
        expect(connect).toBeInstanceOf(Function);
    });

    it("should open mongo connection", async () => {
        await connect();
        expect(mongoose.connection.readyState).toEqual(status.CONNECTED);
    });

    it("should not try to open mongo connection again when connection is open already", async () => {
        jest.spyOn(mongoose, "connect");
        mongoose.connect = jest.fn();
        const result = await connect();
        expect(result).toEqual(undefined);
        expect(mongoose.connect.mock.calls.length).toEqual(0);
    });
});

describe("disconnect", () => {
    it("should be a function", () => {
        expect(disconnect).toBeInstanceOf(Function);
    });

    it("should close mongo connection", async () => {
        // The connection is opened by the test of connection above
        await disconnect();
        expect(mongoose.connection.readyState).toEqual(status.DISCONNECTED);
    });
});
