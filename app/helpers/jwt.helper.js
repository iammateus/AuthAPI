const jwt = require("jsonwebtoken");
const env = require("../helpers/env.helper");

const create = () => {
    const secret = env.get("AUTH_SECRET");
    return jwt.sign({}, secret);
};

const check = () => {
    return true;
};

module.exports = {
    create,
    check,
};
