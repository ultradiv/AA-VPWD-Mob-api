const express = require("express");
const router = express.Router();
const {
  getLanguagesByLocation,
  insertGeoFence,
  getLanguagesByFence,
  assignLanguagesToFence,
  removeLanguageFromFence,
  deleteGeoFence,
} = require("../controllers/geoController");

router.post("/languages", getLanguagesByLocation);
router.post("/insert", insertGeoFence);
router.get("/languages", getLanguagesByFence);
router.post("/assign-languages", assignLanguagesToFence);
router.post("/remove-language", removeLanguageFromFence);
router.delete("/delete/:id", deleteGeoFence);

module.exports = router;
