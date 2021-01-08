const get = (name) => {
    return process.env[name];
};

const set = (name, value) => {
    process.env[name] = value;
};

module.exports = { get, set };
