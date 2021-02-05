const { validate } = require("../controllers/controller");
const PostAuthRegister = require("../validations/PostAuthRegister");
const PostAuthLogin = require("../validations/PostAuthLogin");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { check } = require("../helpers/passwordHash.helper");
const jwt = require("../helpers/jwt.helper");

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

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            message: "Email or password does not exist",
        });
    }

    const isPasswordValid = await check(password, user.password);
    if (!isPasswordValid) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            message: "Email or password does not exist",
        });
    }

    const token = jwt.create({ id: user._id });

    res.json({
        message: "User authenticated successfully",
        data: {
            token,
        },
    });
};

module.exports = { register, login };
