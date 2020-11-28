const env = require("../app/helpers/env.helper");
const faker = require("faker");

describe("env", () => {
    it("should be a function", () => {
        expect(env).toBeInstanceOf(Function);
    });

    it("should return an environment variable value when trying to get an existent environment variable", () => {
        const envVarValue = faker.lorem.word();
        process.env.A_ENVIRONMENT_VARIABLE = envVarValue;
        expect(env("A_ENVIRONMENT_VARIABLE")).toEqual(envVarValue);
    });
});
