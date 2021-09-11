const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const path = require("path");

const db_connection = require("./config/dbConnection");

// init express
const app = express();

// settings
require("dotenv").config();
const port = process.env.PORT || 4001;

// middelwars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname) + "/public"));

// cors
app.use('*',cors());

// Logger
app.use(logger("dev"));

// routes
app.use("/api", require("./routes/routes"));
app.use("*", (req,res)=>{
	res.json({title:'Wellcome to Api!',msg:'url invalid!'})
});

// run server
app.listen(port,'0.0.0.0', () => {
  console.log("Server Runing on port " + port + "!");
});

// open connecion To db
db_connection.connect((error) => {
  if (error) {
    console.log("Error de conexion!", error);
  } else {
    console.log("Conexion Exitosa!");
  }
});


module.exports = app;
