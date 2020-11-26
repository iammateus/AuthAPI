const Joi = require("joi");

const PostAuthRegister = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    password_confirmation: Joi.string().equal(Joi.ref("password")),
});

module.exports = PostAuthRegister;
