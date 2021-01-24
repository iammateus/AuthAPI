const { create, check } = require("../app/helpers/jwt.helper");
const jwt = require("jsonwebtoken");
const env = require("../app/helpers/env.helper");
const faker = require("faker");

describe("create", () => {
    beforeAll(() => {
        env.set("AUTH_SECRET", faker.lorem.word());
    });
    
    it("should be a function", () => {
        expect(create).toBeInstanceOf(Function);
    });

    it("should return an string", () => {
        const token = create();
        expect(typeof token === "string").toBe(true);
    });

    it("should return a decodable token string", () => {
        const token = create();
        const secret = env.get("AUTH_SECRET");
        const result = jwt.verify(token, secret);
        expect(result).toBeTruthy();
    });
});

describe("check", () => {
    it("should be a function", () => {
        expect(check).toBeInstanceOf(Function);
    });

    it("should return true when token is valid", () => {
        const secret = env.get("AUTH_SECRET");
        const token = jwt.sign({}, secret);
        const result = check(token);
        expect(result).toBe(true);
    });

    it("should return false when token is signed with an invalid token", () => {
        const invalidSecret = faker.lorem.word();
        const invalidToken = jwt.sign({}, invalidSecret);
        const result = check(invalidToken);
        expect(result).toBe(false);
    });

    it("should return false when token is invalid", () => {
        const invalidToken = faker.lorem.word();
        const result = check(invalidToken);
        expect(result).toBe(false);
    });
});
