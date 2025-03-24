const { poolPromise, sql } = require("../config/db");

async function callStoredProcedure(procedureName, inputParams = {}) {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    for (const [key, { type, value }] of Object.entries(inputParams)) {
      request.input(key, type, value);
    }
    const result = await request.execute(procedureName);
    return result.recordset;
  } catch (err) {
    throw new Error(`Stored procedure error: ${err.message}`);
  }
}

module.exports = { callStoredProcedure, sql };
