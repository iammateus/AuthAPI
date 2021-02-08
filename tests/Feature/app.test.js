const request = require("supertest");
const app = require("../../index");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

describe("server", () => {
    it("should return a not found response when receiving a request for a non-existent route", async () => {
        const response = await request(app).get("/anything-non-existent");
        expect(response.status).toEqual(StatusCodes.NOT_FOUND);
        expect(response.body).toMatchObject({
            message: ReasonPhrases.NOT_FOUND,
        });
    });
});
