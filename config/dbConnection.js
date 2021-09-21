const mysql = require("mysql");

require("dotenv").config();

const production = {
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
};
const desarrollo = {
  host: "localhost",
  database: "allkemy-challenge",
  user: "root",
  password: "",
};
const db_connection = mysql.createConnection(production);

module.exports = db_connection;
