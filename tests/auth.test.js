const request = require("supertest");
const { StatusCodes } = require("http-status-codes");
const app = require("../index");
const User = require("../app/models/User");
const faker = require("faker");
const { mockDatabase, unmockDatabase } = require("./mocks/database.mock");
const database = require("../app/database/database");
const { check } = require("../app/helpers/passwordHash.helper");

describe("/auth/register", () => {
    beforeAll(() => {
        mockDatabase();
        database.connect();
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

    afterAll(async () => {
        unmockDatabase();
        await database.disconnect();
    });
});
