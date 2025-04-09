const { callStoredProcedure, sql } = require("../utils/dbUtils");

async function deviceHeartbeat(req, res) {
  const { uuid, lat, lon } = req.body;

  if (!uuid || !lat || !lon) {
    return res.status(400).json({ error: "Missing uuid, lat or lon" });
  }

  try {
    const result = await callStoredProcedure("AA_check_polygon_change", {
      lat: { type: sql.Float, value: parseFloat(lat) },
      lon: { type: sql.Float, value: parseFloat(lon) },
      uuid: { type: sql.NVarChar(255), value: uuid },
    });

    const response = result?.[0];

    if (!response) {
      return res
        .status(500)
        .json({ error: "Unexpected response from database" });
    }

    const noChange = response.noChange === "true";

    res.json({
      uuid,
      noChange,
      shouldFetchLanguages: !noChange,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Device heartbeat error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  deviceHeartbeat,
};
