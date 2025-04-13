const { callStoredProcedure, sql } = require("../utils/dbUtils");

async function getMobJson(req, res) {
  const lang = req.query.lang || "en";

  try {
    const result = await callStoredProcedure("AA_GetInterfaceLanguageJson", {
      lang_code: { type: sql.NVarChar, value: lang },
    });

    if (!Array.isArray(result) || result.length === 0) {
      return res
        .status(404)
        .json({ error: "No data returned from stored procedure" });
    }

    // Split result sets (MSSQL returns all rows as a flat array so we assume 3x result sets in order)
    const phraseRows = result[0];
    const countryRows = result[1];
    const orgRows = result[2];

    // Build core key-value JSON
    const jsonOutput = {};
    phraseRows.forEach(({ key, value }) => {
      jsonOutput[key] = value;
    });

    // Add country array
    jsonOutput.countries_array = (countryRows || []).map((row) => ({
      code: row.code,
      name: row.name,
    }));

    // Add organisation array
    jsonOutput.organisation_array = (orgRows || []).map((row) => ({
      code: row.code,
      name: row.name,
    }));

    res.json(jsonOutput);
  } catch (err) {
    console.error("Error in /mob route:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getMobJson };
