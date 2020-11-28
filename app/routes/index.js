const express = require("express");
const router = express.Router();
const { runHealthcheck } = require("../controllers/healthcheck.controller");

router.get("/healthcheck", runHealthcheck);
router.post("/oi", (req, res, next) => {
    res.json({ oi: true });
});

module.exports = router;
