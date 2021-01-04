const express = require("express");
const router = express.Router();
const { healthcheck } = require("../controllers/healthcheck.controller");

router.get("/healthcheck", healthcheck);

module.exports = router;
