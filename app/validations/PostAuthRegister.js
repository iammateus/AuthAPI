const Joi = require("joi");

const PostAuthRegister = Joi.object({
    email: Joi.string().email().required(),
});

module.exports = PostAuthRegister;
