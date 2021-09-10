const path = require("path");
const jwt = require("jsonwebtoken");

function generarJWT({ id_user }) {

  console.log(id_user);
  
  const payload = {
    check: true,
    id_user,
  };
  const token = jwt.sign(payload, process.env.SECRED_JWT_SEDD, {
    expiresIn: "3d",
  });
  return token;
}

module.exports = {
  generarJWT,
};
