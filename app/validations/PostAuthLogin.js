const Joi = require("joi");

const PostAuthLogin = Joi.object({
    email: Joi.string().email().required(),
});

module.exports = PostAuthLogin;
