const env = require("../../app/helpers/env.helper");
const faker = require("faker");

describe("get", () => {
    it("should be a function", () => {
        expect(env.get).toBeInstanceOf(Function);
    });

    it("should return an environment variable value when trying to get an existent environment variable", () => {
        const envVarName = faker.lorem.word().toUpperCase();
        const envVarValue = faker.lorem.word();
        process.env[envVarName] = envVarValue;
        expect(env.get(envVarName)).toEqual(envVarValue);
    });
});

describe("set", () => {
    it("should be a function", () => {
        expect(env.set).toBeInstanceOf(Function);
    });

    it("should set an enviroment variable with the name and value informed", () => {
        const envVarName = faker.lorem.word().toUpperCase();
        const envVarValue = faker.lorem.word();
        env.set(envVarName, envVarValue);
        expect(process.env[envVarName]).toEqual(envVarValue);
    });
});
