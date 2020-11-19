const express = require("express");
const router = express.Router();

router.get("/auth/register", (req, res, next) => {
    res.json({});
});

module.exports = router;
