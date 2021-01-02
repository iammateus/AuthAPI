const { validate } = require("../controllers/controller");
const PostAuthRegister = require("../validations/PostAuthRegister");
const PostAuthLogin = require("../validations/PostAuthLogin");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res, next) => {
    const error = await validate(req.body, PostAuthRegister, res);
    if (error) {
        return error;
    }

    const user = new User(req.body);
    await user.save();
    res.status(StatusCodes.CREATED).json({
        message: "The user was created successfully",
    });
};

const login = async (req, res, next) => {
    const error = await validate(req.body, PostAuthLogin, res);
    if (error) {
        return error;
    }

    res.json({
        message: "A message",
    });
};

module.exports = { register, login };
