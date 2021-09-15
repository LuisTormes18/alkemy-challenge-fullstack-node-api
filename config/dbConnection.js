const mysql = require('mysql');

require("dotenv").config();

const { MYSQL_ADDON_HOST, MYSQL_ADDON_DB, MYSQL_ADDON_USER, MYSQL_ADDON_PASSWORD } = process.env
const production = {

host:MYSQL_ADDON_HOST,
user:MYSQL_ADDON_USER,
password:MYSQL_ADDON_PASSWORD,
database:MYSQL_ADDON_DB

}
const desarrollo = {
	host: "localhost",
    database: "allkemy-challenge",
    user: "root",
    password: "",	
}
const db_connection = mysql.createConnection(desarrollo);

module.exports = db_connection;