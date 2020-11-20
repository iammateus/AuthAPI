const express = require("express");
const router = express.Router();
const { validate } = require("../controllers/controller");
const Joi = require("joi");

router.get("/auth/register", (req, res, next) => {
    res.json({});
});

module.exports = router;
