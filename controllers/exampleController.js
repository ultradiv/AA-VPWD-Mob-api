const { callStoredProcedure, sql } = require("../utils/dbUtils");

async function getItems(req, res) {
  try {
    const items = await callStoredProcedure("sp_getItems"); // Replace with your SP name
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getItems };
