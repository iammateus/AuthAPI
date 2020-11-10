var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.json({ message: "Hello World!" });
});

router.get("/healthcheck", function (req, res, next) {
    res.json({ message: "The server is running (CanvasAPI)" });
});

module.exports = router;
