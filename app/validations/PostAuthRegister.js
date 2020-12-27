const Joi = require("joi");
const User = require("../models/User");

const uniqueKeyOfMongooseModel = require("./rules/uniqueKeyOfMongooseModel.rule");
const uniqueEmail = uniqueKeyOfMongooseModel.bind(null, "email", User);

const PostAuthRegister = Joi.object({
    email: Joi.string().email().external(uniqueEmail).required(),
    password: Joi.string().min(8).required(),
    password_confirmation: Joi.string().equal(Joi.ref("password")),
    name: Joi.string().required(),
});

module.exports = PostAuthRegister;
