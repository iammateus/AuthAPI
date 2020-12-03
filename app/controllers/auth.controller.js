const { validate } = require("../controllers/controller");
const PostAuthRegister = require("../validations/PostAuthRegister");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const database = require("../database/database");

const register = async (req, res, next) => {
    const error = validate(req.body, PostAuthRegister, res);
    if (error) {
        return error;
    }
    await database.connect();
    const user = new User(req.body);
    await user.save();
    res.status(StatusCodes.CREATED).json({
        message: "The user was created successfully",
    });
};

module.exports = { register };
