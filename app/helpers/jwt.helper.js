const jwt = require("jsonwebtoken");
const env = require("../helpers/env.helper");

const create = () => {
    const secret = env("AUTH_SECRET");
    return jwt.sign({}, secret);
};

module.exports = {
    create,
};
