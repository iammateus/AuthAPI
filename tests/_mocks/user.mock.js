const User = require("../../app/models/User");
const faker = require("faker");

const create = async () => {
    const data = {
        email: faker.internet.email(),
        name: faker.lorem.words(2),
        password: faker.lorem.word(8),
    };

    const user = new User(data);
    await user.save();

    return { user, password: data.password };
};

module.exports = {
    create,
};
