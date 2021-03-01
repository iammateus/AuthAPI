const jwt = require("jsonwebtoken");
const env = require("../helpers/env.helper");

const create = (content) => {
    const secret = env.get("AUTH_SECRET");
    return jwt.sign(content, secret);
};

const parse = (token) => {
    const secret = env.get("AUTH_SECRET");
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return false;
    }
};

module.exports = {
    create,
    parse,
};
