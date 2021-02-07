const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const healthcheckController = require("../controllers/healthcheck.controller");

router.get("/healthcheck", healthcheckController.healthcheck);

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

module.exports = router;
