const { callStoredProcedure, sql } = require("../utils/dbUtils");

async function saveDeviceStats(req, res) {
  const jsonString = JSON.stringify(req.body);

  try {
    const result = await callStoredProcedure("sp_SaveDeviceVideoData", {
      json: { type: sql.NVarChar(sql.MAX), value: jsonString },
    });

    res.json({ success: true, result });
  } catch (err) {
    console.error("Stored procedure failure:", err);
    res.status(500).json({ error: "Stored procedure error: " + err.message });
  }
}

module.exports = { saveDeviceStats };
