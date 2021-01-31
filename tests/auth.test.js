const request = require("supertest");
const { StatusCodes } = require("http-status-codes");
const app = require("../index");
const { mockDatabase, unmockDatabase } = require("./mocks/database.mock");
const database = require("../app/database/database");
const { check } = require("../app/helpers/passwordHash.helper");
const jwt = require("../app/helpers/jwt.helper");
const userMock = require("./mocks/user.mock");
const faker = require("faker");
const User = require("../app/models/User");

describe("/auth/register", () => {
    beforeAll(async () => {
        mockDatabase();
        await database.connect();
    });

    it("should register user", async () => {
        const pass = faker.lorem.word(8);
        const data = {
            email: faker.internet.email(),
            name: faker.lorem.words(2),
            password: pass,
            password_confirmation: pass,
        };
        const response = await request(app).post("/auth/register").send(data);
        expect(response.status).toEqual(StatusCodes.CREATED);

        const user = await User.findOne({
            email: data.email,
            name: data.name,
        });
        expect(user).toBeTruthy();

        const savedHashMatchesInformedPass = await check(
            data.password,
            user.password
        );
        expect(savedHashMatchesInformedPass).toBe(true);
    });

    it("should exists", async () => {
        const response = await request(app).post("/auth/register");
        expect(response.status !== StatusCodes.NOT_FOUND).toBe(true);
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

    it("should return unprocessable entity when password is not informed", async () => {
        const data = {
            email: faker.internet.email(),
        };
        const response = await request(app).post("/auth/register").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"password" is required',
            path: ["password"],
            type: "any.required",
            context: { label: "password", key: "password" },
        });
    });

    it("should return unprocessable entity when password is too short", async () => {
        const data = {
            email: faker.internet.email(),
            password: faker.lorem.word(7),
        };
        const response = await request(app).post("/auth/register").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"password" length must be at least 8 characters long',
            path: ["password"],
            type: "string.min",
            context: { label: "password", key: "password" },
        });
    });

    it("should return unprocessable entity when password_confirmation is not equal to password", async () => {
        const data = {
            email: faker.internet.email(),
            password: faker.lorem.word(8),
            password_confirmation: faker.lorem.word(9),
        };
        const response = await request(app).post("/auth/register").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"password_confirmation" must be [ref:password]',
            path: ["password_confirmation"],
            type: "any.only",
            context: {
                label: "password_confirmation",
                key: "password_confirmation",
            },
        });
    });

    it("should return unprocessable entity when password_confirmation is not equal to password", async () => {
        const pass = faker.lorem.word(8);
        const data = {
            email: faker.internet.email(),
            password: pass,
            password_confirmation: pass,
        };
        const response = await request(app).post("/auth/register").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"name" is required',
            path: ["name"],
            type: "any.required",
            context: { label: "name", key: "name" },
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

        const response = await request(app).post("/auth/register").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"email" is already in use',
        });

        const users = await User.find({
            email: data.email,
        });
        expect(users.length).toEqual(1);
    });
});

describe("/auth/login", () => {
    it("should return ok status and token when user is found by credentials", async () => {
        const user = await userMock.create();
        const data = {
            email: user.email,
            password: user.password,
        };
        const response = await request(app).post("/auth/login").send(data);
        expect(response.status).toEqual(StatusCodes.OK);
        expect(response.body.message).toEqual(
            "User authenticated successfully"
        );
        const { token } = response.body.data;
        expect(jwt.check(token)).toBeTruthy();
    });

    it("should exist", async () => {
        const response = await request(app).post("/auth/login");
        expect(response.status !== StatusCodes.NOT_FOUND).toBe(true);
    });

    it("should return unprocessable entity when email is not informed", async () => {
        const response = await request(app).post("/auth/login");
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"email" is required',
            path: ["email"],
            type: "any.required",
            context: { label: "email", key: "email" },
        });
    });

    it("should return unprocessable entity when email is invalid", async () => {
        const data = {
            email: faker.lorem.word(),
        };
        const response = await request(app).post("/auth/login").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"email" must be a valid email',
            path: ["email"],
            type: "string.email",
            context: { label: "email", key: "email" },
        });
    });

    it("should return unprocessable entity when password is not informed", async () => {
        const data = {
            email: faker.internet.email(),
        };
        const response = await request(app).post("/auth/login").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"password" is required',
            path: ["password"],
            type: "any.required",
            context: { label: "password", key: "password" },
        });
    });

    it("should return unprocessable entity when password is too short", async () => {
        const data = {
            email: faker.internet.email(),
            password: faker.lorem.word(7),
        };
        const response = await request(app).post("/auth/login").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: '"password" length must be at least 8 characters long',
            path: ["password"],
            type: "string.min",
            context: { label: "password", key: "password" },
        });
    });

    it("should return unprocessable entity when user email is invalid", async () => {
        const data = {
            email: faker.internet.email(),
            password: faker.lorem.word(8),
        };
        const response = await request(app).post("/auth/login").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: "Email or password does not exist",
        });
    });

    it("should return unprocessable entity when user password is invalid", async () => {
        const userData = await userMock.create();

        const data = {
            email: userData.email,
            password: faker.lorem.word(9),
        };

        const response = await request(app).post("/auth/login").send(data);
        expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toMatchObject({
            message: "Email or password does not exist",
        });
    });

    afterAll(async () => {
        unmockDatabase();
        await database.disconnect();
    });
});
