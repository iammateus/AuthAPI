const {
    hash,
    check,
    saltRounds,
} = require("../app/helpers/passwordHash.helper");
const faker = require("faker");
const bcrypt = require("bcrypt");

describe("PostAuthRegister:hash", () => {
    it("should be a function", () => {
        expect(hash).toBeInstanceOf(Function);
    });

    it("should return a hashed password", async () => {
        const password = faker.lorem.word();
        const hashed = await hash(password);
        expect(typeof hashed).toEqual("string");

        const checked = await bcrypt.compare(password, hashed);
        expect(checked).toBe(true);
    });
});

describe("PostAuthRegister:check", () => {
    it("should be a function", () => {
        expect(check).toBeInstanceOf(Function);
    });

    it("should return true if password matches hash", async () => {
        const password = faker.lorem.word();
        const hashed = await bcrypt.hash(password, saltRounds);

        const checked = await check(password, hashed);
        expect(checked).toBe(true);
    });
    
    it("should return false if password matches hash", async () => {
        const password = faker.lorem.word();
        const otherPassword = faker.lorem.word();
        const hashed = await bcrypt.hash(password, saltRounds);

        const checked = await check(otherPassword, hashed);
        expect(checked).toBe(false);
    });
});
