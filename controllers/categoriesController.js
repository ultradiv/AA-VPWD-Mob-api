const { callStoredProcedure } = require("../utils/dbUtils");

async function getCategories(req, res) {
  try {
    const result = await callStoredProcedure("AA_GetCategoriesJson");

    // SQL returns something like: [{ "JSON_F52E2B61-18A1-11d1-B105-00805F49916B": "<json string>" }]
    const jsonKey = Object.keys(result[0])[0]; // dynamic key
    const parsed = JSON.parse(result[0][jsonKey]); // convert string to object

    res.json(parsed); // now returns clean JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getCategories };
