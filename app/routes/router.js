const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const healthController = require("../controllers/health.controller");
const { wrap } = require("async-middleware");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/health", wrap(healthController.health));

router.post("/users", wrap(userController.create));

router.get("/users/me", authMiddleware, wrap(userController.me));

router.post("/auth/login", wrap(authController.login));

module.exports = router;
