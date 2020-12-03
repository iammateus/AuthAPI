const runHealthcheck = async (req, res, next) => {
    res.json({ message: "The server is running (CanvasAPI)" });
};

module.exports = {
    runHealthcheck,
};
