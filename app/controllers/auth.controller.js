const { validate } = require("../controllers/controller");
const PostAuthRegister = require("../validations/PostAuthRegister");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res, next) => {
    const { body } = req;
    const error = validate(body, PostAuthRegister, res);
    if (error) {
        return error;
    }

    const isEmailInUse = await User.findOne({
        email: body.email,
    });
    if (isEmailInUse) {
        return res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({ message: '"email" is already in use' });
    }

    const user = new User(body);
    await user.save();
    res.status(StatusCodes.CREATED).json({
        message: "The user was created successfully",
    });
};

module.exports = { register };
