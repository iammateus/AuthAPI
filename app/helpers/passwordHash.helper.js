const bcrypt = require("bcrypt");

const saltRounds = 10;

const hash = async (password) => {
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
};

const check = async (password, hashed) => {
    const checked = await bcrypt.compare(password, hashed);
    return checked;
};

module.exports = {
    hash,
    check,
    saltRounds,
};
