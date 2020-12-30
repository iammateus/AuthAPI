const express = require("express");
const router = express.Router();
const { register } = require("../controllers/auth.controller");

router.post("/auth/register", register);
router.post("/auth/login", async (req, res, next) => {
    res.json({
        message: "A message",
    });
});

module.exports = router;
