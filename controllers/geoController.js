const { callStoredProcedure, sql } = require("../utils/dbUtils");

async function getLanguagesByLocation(req, res) {
  const { lat, lon } = req.body;

  if (lat == null || lon == null) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  try {
    const result = await callStoredProcedure("AA_get_languages_by_location", {
      lat: { type: sql.Decimal(9, 6), value: lat },
      lon: { type: sql.Decimal(9, 6), value: lon },
    });

    res.json({ languages: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
/*
async function insertGeoFence(req, res) {
  const { name, polygonText } = req.body;

  if (!name || !polygonText) {
    return res.status(400).json({ error: "Missing name or polygonText" });
  }

  try {
    const pool = await require("../config/db").poolPromise;
    const request = pool.request();

    console.log("INSERTING polygon:", name);
    console.log("POLYGON TEXT:", polygonText);

    request.input("name", sql.NVarChar(200), name);
    request.input("polygonText", sql.NVarChar(sql.MAX), polygonText);
    request.output("fence_id", sql.Int);

    await request.execute("AA_insert_geo_fence");
    const fence_id = request.parameters.fence_id.value;

    res.json({ success: true, fence_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
*/
async function insertGeoFence(req, res) {
  const { name, polygonText } = req.body;

  if (!name || !polygonText) {
    return res.status(400).json({ error: "Missing name or polygonText" });
  }

  try {
    const pool = await require("../config/db").poolPromise;
    const request = pool.request();

    //  console.log("🔹 Inserting polygon...");
    //  console.log("🔸 Name:", name);
    //  console.log("🔸 WKT:", polygonText);

    request.input("name", sql.NVarChar(200), name);
    request.input("polygonText", sql.NVarChar(sql.MAX), polygonText);
    request.output("fence_id", sql.Int);

    const result = await request.execute("AA_insert_geo_fence");

    //  console.log("✅ Stored procedure completed.");
    //  console.log("➡️  fence_id returned:", result.output.fence_id);

    res.json({
      success: true,
      fence_id: result.output.fence_id,
      debug: result,
    });
  } catch (err) {
    console.error("❌ SQL EXECUTION ERROR:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
}

async function getLanguagesByFence(req, res) {
  const { fence_id } = req.query;

  if (!fence_id) {
    return res.status(400).json({ error: "Missing fence_id" });
  }

  try {
    const pool = await require("../config/db").poolPromise;
    const result = await pool
      .request()
      .input("fence_id", sql.Int, fence_id)
      .execute("AA_get_languages_by_fence");

    const assigned = result.recordsets[0];
    const available = result.recordsets[1];

    res.json({ assigned, available });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function assignLanguageToFence(req, res) {
  const { fence_id, language_id } = req.body;

  if (!fence_id || !language_id) {
    return res.status(400).json({ error: "Missing fence_id or language_id" });
  }

  try {
    await callStoredProcedure("AA_assign_language_to_fence", {
      fence_id: { type: sql.Int, value: fence_id },
      language_id: { type: sql.Int, value: language_id },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Assign failed:", err);
    res.status(500).json({ error: err.message });
  }
}

async function removeLanguageFromFence(req, res) {
  const { fence_id, language_id } = req.body;

  if (!fence_id || !language_id) {
    return res.status(400).json({ error: "Missing fence_id or language_id" });
  }

  try {
    await callStoredProcedure("AA_remove_language_from_fence", {
      fence_id: { type: sql.Int, value: fence_id },
      language_id: { type: sql.Int, value: language_id },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Remove failed:", err);
    res.status(500).json({ error: err.message });
  }
}

async function deleteGeoFence(req, res) {
  const fence_id = parseInt(req.params.id);
  if (!fence_id) {
    return res.status(400).json({ error: "Missing fence ID" });
  }

  try {
    await callStoredProcedure("AA_delete_geo_fence", {
      fence_id: { type: sql.Int, value: fence_id },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to delete geofence:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}

async function updateGeoFence(req, res) {
  const { fence_id, polygonText, name } = req.body;

  if (!fence_id || !polygonText) {
    return res.status(400).json({ error: "Missing fence_id or polygonText" });
  }

  try {
    await callStoredProcedure("AA_update_geo_fence", {
      fence_id: { type: sql.Int, value: fence_id },
      polygonText: { type: sql.NVarChar(sql.MAX), value: polygonText },
      name: { type: sql.NVarChar(255), value: name || null },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Update failed:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  insertGeoFence,
  getLanguagesByFence,
  assignLanguageToFence,
  removeLanguageFromFence,
  getLanguagesByLocation,
  deleteGeoFence,
  updateGeoFence,
};
