const Joi = require("joi");
const User = require("../models/User");

const uniqueFieldOfMongooseModel = require("./rules/uniqueFieldOfMongooseModel.rule");
const uniqueEmail = uniqueFieldOfMongooseModel.bind(null, "email", User);

const PostAuthRegister = Joi.object({
    email: Joi.string().email().external(uniqueEmail).required(),
    password: Joi.string().min(8).required(),
    password_confirmation: Joi.string().equal(Joi.ref("password")),
    name: Joi.string().required(),
});

module.exports = PostAuthRegister;
