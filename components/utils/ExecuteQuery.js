const db_connection = require("../../config/dbConnection");

const ExecuteQuery = (query) => {
  return new Promise(async (resolve, reject) => {
    await db_connection.query(query, (error, result) => {
      resolve({ error, result });
    });
  });
};
module.exports = ExecuteQuery;
