const faker = require("faker");
const User = require("../../app/models/User");
const database = require("../../app/database/database");
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

    //@TODO: tests auto password hashing

    afterAll(async () => {
        await unmockDatabaseAndDisconnect();
    });
});
