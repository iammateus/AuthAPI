const express = require("express");
const router = express.Router();
const { runHealthcheck } = require("../controllers/healthcheck.controller");

router.get("/healthcheck", runHealthcheck);

module.exports = router;
