const { validate } = require("../controllers/controller");
const PostAuthRegister = require("../validations/PostAuthRegister");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
    const error = await validate(req.body, PostAuthRegister, res);
    if (error) {
        return error;
    }

    const user = new User(req.body);
    await user.save();
    res.status(StatusCodes.CREATED).json({
        message: "The user was created successfully",
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt.toString(),
                updatedAt: user.updatedAt.toString(),
            },
        },
    });
};

const me = async (req, res, next) => {
    const user = await User.findOne({ _id: res.locals.userId });
    res.json({
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt.toString(),
                updatedAt: user.updatedAt.toString(),
            },
        },
    });
};

module.exports = { create, me };
