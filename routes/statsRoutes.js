const express = require("express");
const router = express.Router();
const { saveDeviceStats } = require("../controllers/statsController");

router.post("/", saveDeviceStats);

module.exports = router;
