const { validate } = require("../controllers/controller");
const PostAuthLogin = require("../validations/PostAuthLogin");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { check } = require("../helpers/passwordHash.helper");
const jwtHelper = require("../helpers/jwt.helper");

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

    const token = jwtHelper.create({ id: user._id });

    res.json({
        message: "User authenticated successfully",
        data: {
            token,
        },
    });
};

module.exports = { login };
