const Joi = require("joi");

const PostAuthRegister = Joi.object({
    email: Joi.required(),
});

module.exports = PostAuthRegister;
