const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const healthcheckController = require("../controllers/healthcheck.controller");

router.get("/healthcheck", healthcheckController.healthcheck);

router.post("/users", userController.create);
router.post("/users/me", userController.me);

router.post("/auth/login", authController.login);

module.exports = router;
