const authMiddleware = require("../../app/middlewares/auth.middleware");
const jwtHelper = require("../../app/helpers/jwt.helper");
const expect = require("chai").expect;
const faker = require("faker");
const env = require("../../app/helpers/env.helper");

const mockValidBearerToken = () => {
    const token = jwtHelper.create({});
    return "Bearer " + token;
};

describe("authMiddleware", () => {
    beforeAll(() => {
        env.set("AUTH_SECRET", faker.lorem.word());
    });

    it("should be a function", () => {
        expect(authMiddleware).to.be.a.instanceof(Function);
    });

    it("should call next and return when bearer token is valid", () => {
        const req = { header: mockValidBearerToken };
        const nextReturnValue = {
            [faker.lorem.word()]: faker.lorem.word(),
        };
        const next = jest.fn().mockReturnValueOnce(nextReturnValue);

        const result = authMiddleware(req, {}, next);

        expect(next.mock.calls.length).to.equal(1);
        expect(result).to.equal(nextReturnValue);
    });
});

/*   it("should be a private route and return unathorized when token not informed", async () => {
        const response = await request(app).post("/users/me");
        expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
        expect(response.body).toMatchObject({
            message: ReasonPhrases.UNAUTHORIZED,
        });
    });

    it("should be a private route and return unauthorized when token is invalid", async () => {
        const header = {
            Authorization: "Bearer " + faker.lorem.text(),
        };
        const response = await request(app).post("/users/me").set(header);
        expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
        expect(response.body).toMatchObject({
            message: ReasonPhrases.UNAUTHORIZED,
        });
    });

 */
