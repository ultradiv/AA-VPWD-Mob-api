const { callStoredProcedure } = require("../utils/dbUtils");

async function getCategories(req, res) {
  try {
    const result = await callStoredProcedure("AA_GetCategoriesJson");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getCategories };
