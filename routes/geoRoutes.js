const express = require("express");
const router = express.Router();
const {
  getLanguagesByLocation,
  insertGeoFence,
  getLanguagesByFence,
  assignLanguageToFence,
  removeLanguageFromFence,
  deleteGeoFence,
  updateGeoFence,
  getLanguagesByLocation,
} = require("../controllers/geoController");

router.post("/languages", getLanguagesByLocation);
router.post("/insert", insertGeoFence);
router.get("/languages", getLanguagesByFence);
router.post("/assign-language", assignLanguageToFence);
router.post("/remove-language", removeLanguageFromFence);
router.delete("/delete/:id", deleteGeoFence);
router.put("/update", updateGeoFence);
router.post("/languages-by-location", getLanguagesByLocation);

module.exports = router;
