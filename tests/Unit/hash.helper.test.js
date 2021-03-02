const { hash, check } = require("../../app/helpers/hash.helper");
const faker = require("faker");
const bcrypt = require("bcrypt");

describe("hash", () => {
    it("should be a function", () => {
        expect(hash).toBeInstanceOf(Function);
    });

    it("should return a password hash", async () => {
        const password = faker.lorem.word();
        const hashed = await hash(password);
        expect(typeof hashed).toEqual("string");

        const checked = await bcrypt.compare(password, hashed);
        expect(checked).toBe(true);
    });
});

describe("check", () => {
    it("should be a function", () => {
        expect(check).toBeInstanceOf(Function);
    });

    it("should return true when password matches the hash", async () => {
        const password = faker.lorem.word();
        const hashed = await bcrypt.hash(password, 10);

        const checked = await check(password, hashed);
        expect(checked).toBe(true);
    });

    it("should return false when password doesn't matches the hash", async () => {
        const password = faker.lorem.word();
        const otherPassword = faker.lorem.word();
        const hashed = await bcrypt.hash(password, 10);

        const checked = await check(otherPassword, hashed);
        expect(checked).toBe(false);
    });
});
