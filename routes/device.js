const express = require("express");
const router = express.Router();
const { deviceHeartbeat } = require("../controllers/deviceController");

// POST /api/device/heartbeat
router.post("/heartbeat", deviceHeartbeat);

module.exports = router;
