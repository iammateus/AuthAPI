const request = require("supertest");
const app = require("../app");
const { StatusCodes } = require("http-status-codes");

describe("auth/register", () => {
    it("should exist", async () => {
        const response = await request(app).get("/auth/register");
        expect(response.status === StatusCodes.NOT_FOUND).toBe(false);
    });
});
