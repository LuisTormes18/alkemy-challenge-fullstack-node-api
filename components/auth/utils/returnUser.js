const db_connection = require("../../../config/dbConnection");

const returnUser = async (email,callback) => {
 
 await db_connection.query(
    `select * from user where email = "${email}"`,
    (error, result) => {
      if (error) {
        return callback(null);
      } else {
        return callback(result);
      }
    }
       

  );

};
module.exports = returnUser;
