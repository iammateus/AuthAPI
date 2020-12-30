const express = require("express");
const router = express.Router();
const { register } = require("../controllers/auth.controller");
const PostAuthLogin = require("../validations/PostAuthLogin");
const { validate } = require("../controllers/controller");

router.post("/auth/register", register);
router.post("/auth/login", async (req, res, next) => {
    const error = await validate(req.body, PostAuthLogin, res);
    if (error) {
        return error;
    }
    res.json({
        message: "A message",
    });
});

module.exports = router;
