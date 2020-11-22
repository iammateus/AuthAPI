const { validate } = require("../controllers/controller");
const PostAuthRegister = require("../validations/PostAuthRegister");

const register = (req, res, next) => {
    validate(req.body, PostAuthRegister, res);
    res.json({});
};

module.exports = { register };
