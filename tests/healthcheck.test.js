const request = require("supertest");
const app = require("../index");
const { StatusCodes } = require("http-status-codes");

describe("healthcheck", () => {
    it("should give a http ok response and a message saying that the server is running", async () => {
        const response = await request(app).get("/healthcheck");
        expect(response.status).toEqual(StatusCodes.OK);
        expect(response.body).toMatchObject({
            message: "The server is running (CanvasAPI)",
        });
    });
});
