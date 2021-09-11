
const openConnection = (db_connection)=>{


const handleDisconnect = ()=>{
		// open connecion To db
db_connection.connect((error) => {
  if (error) {
    console.log("Error de conexion!", error);
  } else {
    console.log("Conexion Exitosa!");
  }
});
}

db_connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });


handleDisconnect();
}

module.exports = openConnection