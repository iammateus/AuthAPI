const get = (name) => {
    return process.env[name];
};

module.exports = { get };
