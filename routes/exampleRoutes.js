const express = require("express");
const router = express.Router();
const { getItems } = require("../controllers/exampleController");

router.get("/", getItems);

module.exports = router;
