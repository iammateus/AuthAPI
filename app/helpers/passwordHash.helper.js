const bcrypt = require("bcrypt");

const hash = async (password) => {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
};

const check = async (password, hashed) => {
    const checked = await bcrypt.compare(password, hashed);
    return checked;
};

module.exports = {
    hash,
    check,
};
