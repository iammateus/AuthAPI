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
    it("should return a boolean value of wheter the token is valid or not", () => {
        
    });
});
