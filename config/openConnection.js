
const openConnection = (db_connection)=>{


const handleDisconnect = ()=>{
		// open connecion To db
db_connection.connect((error) => {
  if(error){
  console.log("Error de conexion!", error)
  }
  else{
   console.log("Conexion Exitosa!");
  	
  }
});
}

db_connection.on('error', function(error) {
    console.log('db error', error);

    if( error.code === 'PROTOCOL_CONNECTION_LOST'){
    	handleDisconnect()
    }
    else{
    	throw error
    }
  
  });


handleDisconnect();

}

module.exports = openConnection