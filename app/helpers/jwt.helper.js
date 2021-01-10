const jwt = require("jsonwebtoken");
const env = require("../helpers/env.helper");

const create = () => {
    const secret = env.get("AUTH_SECRET");
    return jwt.sign({}, secret);
};

const check = (token) => {
    const secret = env.get("AUTH_SECRET");
    try {
        jwt.verify(token, secret);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = {
    create,
    check,
};
