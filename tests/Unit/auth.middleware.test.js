const authMiddleware = require("../../app/middlewares/auth.middleware");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const jwtHelper = require("../../app/helpers/jwt.helper");
const env = require("../../app/helpers/env.helper");
const expect = require("chai").expect;
const faker = require("faker");

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

    it("should call next and return next result when bearer token is valid", () => {
        const req = { header: mockValidBearerToken };
        const nextReturnValue = {
            [faker.lorem.word()]: faker.lorem.word(),
        };
        const next = jest.fn().mockReturnValueOnce(nextReturnValue);

        const result = authMiddleware(req, {}, next);

        expect(next.mock.calls.length).to.equal(1);
        expect(result).to.deep.equal(nextReturnValue);
    });

    it("should return unathorized when bearer token is not informed", () => {
        const req = { header: () => null };
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);

        const next = jest.fn();

        authMiddleware(req, res, next);

        expect(res.status.mock.calls.length).to.equal(1);
        expect(res.status.mock.calls[0][0]).to.equal(StatusCodes.UNAUTHORIZED);

        expect(res.json.mock.calls.length).to.equal(1);
        expect(res.json.mock.calls[0][0]).to.deep.equal({
            message: ReasonPhrases.UNAUTHORIZED,
        });
    });

    it("should return unathorized when bearer token doesn't start with 'Bearer '", () => {
        const req = {
            header: () => {
                return jwtHelper.create({});
            },
        };
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);

        const next = jest.fn();

        authMiddleware(req, res, next);

        expect(res.status.mock.calls.length).to.equal(1);
        expect(res.status.mock.calls[0][0]).to.equal(StatusCodes.UNAUTHORIZED);

        expect(res.json.mock.calls.length).to.equal(1);
        expect(res.json.mock.calls[0][0]).to.deep.equal({
            message: ReasonPhrases.UNAUTHORIZED,
        });
    });

    it("should return unathorized when bearer token starts with 'Bearer ' but doesn't has a valid body", () => {
        const req = {
            header: () => {
                return "Bearer " + faker.lorem.text();
            },
        };
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);

        const next = jest.fn();

        authMiddleware(req, res, next);

        expect(res.status.mock.calls.length).to.equal(1);
        expect(res.status.mock.calls[0][0]).to.equal(StatusCodes.UNAUTHORIZED);

        expect(res.json.mock.calls.length).to.equal(1);
        expect(res.json.mock.calls[0][0]).to.deep.equal({
            message: ReasonPhrases.UNAUTHORIZED,
        });
    });
});
