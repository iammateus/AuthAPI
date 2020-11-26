const request = require("supertest");
const app = require("../index");
const { StatusCodes } = require("http-status-codes");
const faker = require("faker");

describe("auth/register", () => {
    it("should exist", async () => {
        const response = await request(app).post("/auth/register");
        expect(response.status === StatusCodes.NOT_FOUND).toBe(false);
    });
    it("should return unprocessable entity when email is not informed", async () => {
        const data = {};
        const response = await request(app).post("/auth/register").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"email" is required',
            path: ["email"],
            type: "any.required",
            context: { label: "email", key: "email" },
        });
    });
    it("should return unprocessable entity when email is not a valid email", async () => {
        const data = {
            email: faker.lorem.sentence(),
        };
        const response = await request(app).post("/auth/register").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"email" must be a valid email',
            path: ["email"],
            type: "string.email",
            context: { label: "email", key: "email" },
        });
    });
});
