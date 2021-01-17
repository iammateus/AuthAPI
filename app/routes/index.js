const express = require("express");
const router = express.Router();
const healthcheckController = require("../controllers/healthcheck.controller");

router.get("/healthcheck", healthcheckController.healthcheck);

module.exports = router;
