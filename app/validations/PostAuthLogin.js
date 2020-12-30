const Joi = require("joi");

const PostAuthLogin = Joi.object({
    email: Joi.string().required(),
});

module.exports = PostAuthLogin;
