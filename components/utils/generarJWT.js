const path = require("path");
const jwt = require("jsonwebtoken");

function generarJWT(id ) {

  
  const payload = {
    check: true,
    id,
  };
  const token = jwt.sign(payload, process.env.SECRED_JWT_SEDD, {
    expiresIn: "3d",
  });
  return token;
}

module.exports = generarJWT

