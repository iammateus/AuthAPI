const request = require("supertest");
const app = require("../app");
const { StatusCodes } = require("http-status-codes");

describe("auth/register", () => {
    it("should exist", async () => {
        const response = await request(app).post("/auth/register");
        expect(response.status === StatusCodes.NOT_FOUND).toBe(false);
    });
    it("should return unprocessable entity when email is not informed", async () => {
        const data = {};
        const response = await request(app).post("/auth/register", {
            data,
        });
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    });
});
