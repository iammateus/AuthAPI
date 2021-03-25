const faker = require("faker");
const User = require("../../app/models/User");
const hashHelper = require("../../app/helpers/hash.helper");
const {
    mockDatabaseAndConnect,
    unmockDatabaseAndDisconnect,
} = require("../_mocks/database.mock");

describe("User", () => {
    beforeAll(async () => {
        await mockDatabaseAndConnect();
    });

    it("should save an user with the timestamps createdAt and updatedAt", async () => {
        const data = {
            email: faker.internet.email(),
            password: faker.lorem.word(8),
            password_confirmation: faker.lorem.word(9),
        };
        const user = new User(data);
        await user.save();
        expect(user.createdAt).toBeTruthy();
        expect(user.updatedAt).toBeTruthy();
    });

    it("should hash password before saving", async () => {
        const data = {
            email: faker.internet.email(),
            password: faker.lorem.word(8),
        };
        const user = new User(data);
        await user.save();

        expect(user.password === data.password).toBe(false);
        expect(await hashHelper.check(data.password, user.password)).toBe(true);
    });

    it("should hash new password before saving", async () => {
        const data = {
            email: faker.internet.email(),
            password: faker.lorem.word(8),
        };
        const user = new User(data);
        await user.save();

        const newPassword = faker.lorem.word(8);
        user.password = newPassword;
        await user.save();

        expect(user.password === newPassword).toBe(false);
        expect(await hashHelper.check(newPassword, user.password)).toBe(true);
    });

    afterAll(async () => {
        await unmockDatabaseAndDisconnect();
    });
});
