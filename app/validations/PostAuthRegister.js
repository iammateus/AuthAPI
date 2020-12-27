const Joi = require("joi");
const uniqueMongoose = require("./rules/uniqueMongoose.rule");
const User = require("../models/User");

const PostAuthRegister = Joi.object({
    email: Joi.string()
        .email()
        .external(uniqueMongoose.bind(null, User, "email"))
        .required(),
    password: Joi.string().min(8).required(),
    password_confirmation: Joi.string().equal(Joi.ref("password")),
    name: Joi.string().required(),
});

module.exports = PostAuthRegister;
