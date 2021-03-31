const request = require("supertest");
const app = require("../../index");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const {
    mockDatabaseAndConnect,
    unmockDatabaseAndDisconnect,
} = require("../_mocks/database.mock");
const hashHelper = require("../../app/helpers/hash.helper");
const faker = require("faker");
const User = require("../../app/models/User");

describe("/users", () => {
    beforeAll(async () => {
        await mockDatabaseAndConnect();
    });

    it("should exist", async () => {
        const response = await request(app).post("/users");
        expect(response.status !== StatusCodes.NOT_FOUND).toBe(true);
    });

    it("should register user and return created status code when user data is valid", async () => {
        const pass = faker.lorem.word(8);
        const data = {
            email: faker.internet.email(),
            name: faker.lorem.words(2),
            password: pass,
            password_confirmation: pass,
        };
        const response = await request(app).post("/users").send(data);
        expect(response.status).toEqual(StatusCodes.CREATED);

        const user = await User.findOne({
            email: data.email,
            name: data.name,
        });
        expect(user).toBeTruthy();

        const savedHashMatchesInformedPass = await hashHelper.check(
            data.password,
            user.password
        );
        expect(savedHashMatchesInformedPass).toBe(true);
    });

    it("should return unprocessable entity when email is not informed", async () => {
        const data = {};
        const response = await request(app).post("/users").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"email" is required',
        });
    });

    it("should return unprocessable entity when email is not a valid email", async () => {
        const data = {
            email: faker.lorem.sentence(),
        };
        const response = await request(app).post("/users").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"email" must be a valid email',
        });
    });

    it("should return unprocessable entity when password is not informed", async () => {
        const data = {
            email: faker.internet.email(),
        };
        const response = await request(app).post("/users").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"password" is required',
        });
    });

    it("should return unprocessable entity when password is too short", async () => {
        const data = {
            email: faker.internet.email(),
            password: faker.lorem.word(7),
        };
        const response = await request(app).post("/users").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"password" length must be at least 8 characters long',
        });
    });

    it("should return unprocessable entity when password_confirmation is not equal to password", async () => {
        const data = {
            email: faker.internet.email(),
            password: faker.lorem.word(8),
            password_confirmation: faker.lorem.word(9),
        };
        const response = await request(app).post("/users").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"password_confirmation" must be [ref:password]',
        });
    });

    it("should return unprocessable entity when password_confirmation is not equal to password", async () => {
        const pass = faker.lorem.word(8);
        const data = {
            email: faker.internet.email(),
            password: pass,
            password_confirmation: pass,
        };
        const response = await request(app).post("/users").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"name" is required',
        });
    });

    it("should not register an user with an existing email", async () => {
        const pass = faker.lorem.word(8);
        const data = {
            email: faker.internet.email(),
            password: pass,
            password_confirmation: pass,
            name: faker.lorem.words(2),
        };
        const user = new User(data);
        await user.save();

        const response = await request(app).post("/users").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"email" is already in use',
        });

        const users = await User.find({
            email: data.email,
        });
        expect(users.length).toEqual(1);
    });

    afterAll(async () => {
        await unmockDatabaseAndDisconnect();
    });
});

describe("/users/me", () => {
    beforeAll(async () => {
        await mockDatabaseAndConnect();
    });

    it("should exist", async () => {
        const response = await request(app).get("/users/me");
        expect(response.status !== StatusCodes.NOT_FOUND).toBe(true);
    });

    it("should return user information", async () => {
        const userMock = require("../_mocks/user.mock");
        const authMock = require("../_mocks/auth.mock");

        const { user } = await userMock.create();
        const bearerToken = await authMock.mockBearerToken(user);
        const response = await request(app).get("/users/me").set({
            Authorization: bearerToken,
        });

        expect(response.status).toEqual(StatusCodes.OK);
        expect(response.body).toMatchObject({
            data: {
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt.toString(),
                    updatedAt: user.updatedAt.toString(),
                },
            },
        });
    });

    afterAll(async () => {
        await unmockDatabaseAndDisconnect();
    });
});

describe("private routes", () => {
    let databaseMock;
    let request;
    let app;
    let authMiddleware;
    beforeEach(async () => {
        jest.resetModules();
        jest.mock("../../app/middlewares/auth.middleware.js", () =>
            jest.fn((req, res, next) => next())
        );
        databaseMock = require("../_mocks/database.mock");
        authMiddleware = require("../../app/middlewares/auth.middleware.js");
        request = require("supertest");
        app = require("../../index");
        await databaseMock.mockDatabaseAndConnect();
    });
    it("/users/me should be a private route", async () => {
        await request(app).get("/users/me");
        expect(authMiddleware.mock.calls.length).toEqual(1);
    });
    afterEach(async () => {
        jest.unmock("../../app/middlewares/auth.middleware.js");
        await databaseMock.unmockDatabaseAndDisconnect();
    });
});
