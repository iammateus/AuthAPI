const databaseConfig = require("../app/database/databaseConfig");

describe("databaseConfig:getDatabaseUri", () => {
    it("should be a function", () => {
        expect(databaseConfig.getDatabaseUri).toBeInstanceOf(Function);
    });
});
