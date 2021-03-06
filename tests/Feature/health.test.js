const request = require("supertest");
const app = require("../../index");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const status = require("../../app/database/states");

describe("/health", () => {
    it("should give an ok response and a message saying that the server is running", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toEqual(StatusCodes.OK);
        expect(response.body).toMatchObject({
            message: "The application is running (Auth API)",
            mongodb: {
                connection:
                    mongoose.connection.readyState === status.CONNECTED
                        ? "connected"
                        : "disconnect",
            },
        });
    });
});
