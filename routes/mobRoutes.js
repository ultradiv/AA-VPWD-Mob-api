const express = require("express");
const router = express.Router();
const { getMobJson } = require("../controllers/mobController");

router.get("/", getMobJson);

module.exports = router;
