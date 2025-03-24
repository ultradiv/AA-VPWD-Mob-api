const { callStoredProcedure, sql } = require("../utils/dbUtils");

async function registerDevice(req, res) {
  const {
    device_id,
    gender_id = 0,
    usertype_id = 0,
    country_id = 0,
    lat = 0,
    lon = 0,
  } = req.body;

  if (!device_id) {
    return res.status(400).json({ error: "Missing required field: device_id" });
  }

  try {
    const result = await callStoredProcedure("AA_register_device", {
      device_id: { type: sql.NVarChar(200), value: device_id },
      gender_id: { type: sql.Int, value: gender_id },
      usertype_id: { type: sql.Int, value: usertype_id },
      country_id: { type: sql.Int, value: country_id },
      lat: { type: sql.Decimal(9, 6), value: lat },
      lon: { type: sql.Decimal(9, 6), value: lon },
    });

    const resultValue = result?.[0]?.result;

    if (resultValue && resultValue !== "failure") {
      res.json({ success: true, device_id: resultValue });
    } else {
      res
        .status(200)
        .json({ success: false, message: "Device registration failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { registerDevice };
