const { create } = require("../app/helpers/jwt.helper");
const jwt = require("jsonwebtoken");
const env = require("../app/helpers/env.helper");
const faker = require("faker");

describe("create", () => {
    beforeAll(() => {
        process.env.AUTH_SECRET = faker.lorem.word();
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
