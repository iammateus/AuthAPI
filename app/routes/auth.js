const express = require("express");
const router = express.Router();
const { validate } = require("../controllers/controller");
const PostAuthRegister = require("../validations/PostAuthRegister");

router.post("/auth/register", (req, res, next) => {
    validate(req.body, PostAuthRegister, res);
    res.json({});
});

module.exports = router;
