const express = require("express");
const router = express.Router();
const { registerDevice } = require("../controllers/registerController");

router.post("/", registerDevice);

module.exports = router;
