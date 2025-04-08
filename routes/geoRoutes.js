const express = require("express");
const router = express.Router();
const {
  getLanguagesByLocation,
  insertGeoFence,
  getLanguagesByFence,
  assignLanguageToFence,
  removeLanguageFromFence,
  deleteGeoFence,
} = require("../controllers/geoController");

router.post("/languages", getLanguagesByLocation);
router.post("/insert", insertGeoFence);
router.get("/languages", getLanguagesByFence);
router.post("/assign-language", assignLanguageToFence);
router.post("/remove-language", removeLanguageFromFence);
router.delete("/delete/:id", deleteGeoFence);
router.put("/update", updateGeoFence);

module.exports = router;
