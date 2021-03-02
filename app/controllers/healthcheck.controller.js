const healthcheck = async (req, res, next) => {
    res.json({ message: "The server is running (Auth API)" });
};

module.exports = {
    healthcheck,
};
