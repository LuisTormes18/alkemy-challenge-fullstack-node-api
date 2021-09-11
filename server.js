const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const path = require("path");

const db_connection = require("./config/dbConnection");
const openConnection = require("./config/openConnection");

// init express
const app = express();

// settings
require("dotenv").config();
const port = process.env.PORT || 4001;

// middelwars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// Logger
app.use(logger("dev"));

// routes
app.use("/api", require("./routes/routes"));
app.use("/", (req,res)=>{
	res.json({msg:'Wellcome to Api!!'})
});

// run server
app.listen(port,'0.0.0.0', () => {
  console.log("Server Runing on port " + port + "!");
});

// open db
openConnection(db_connection);

module.exports = app;




