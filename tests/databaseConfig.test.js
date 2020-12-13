const databaseConfig = require("../app/database/databaseConfig");
const env = require("../app/helpers/env.helper");

describe("databaseConfig:getDatabaseUri", () => {
    it("should be a function", () => {
        expect(databaseConfig.getDatabaseUri).toBeInstanceOf(Function);
    });

    it("should return mongo connection uri", () => {
        const host = env("DB_HOST");
        const port = env("DB_PORT");
        const name = env("DB_NAME");
        const uri = "mongodb://" + host + ":" + port + "/" + name;
        const result = databaseConfig.getDatabaseUri();
        expect(result).toEqual(uri);
    });

    it("should return mongo connection options", () => {
        const user = env("DB_USER");
        const pass = env("DB_PASS");
        const options = {
            auth: {
                authSource: "admin",
            },
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user,
            pass,
        };
        const result = databaseConfig.getDatabaseConnectionOptions();
        expect(result).toMatchObject(options);
    });
});
