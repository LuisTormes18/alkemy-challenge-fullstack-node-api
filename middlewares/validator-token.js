const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.json({
      ok: false,
      msg: "Token id required!",
    });
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const { id} = jwt.verify(token, process.env.SECRED_JWT_SEDD);

    req.body.id = id;
   
    
  } catch (error) {
    return res.json({
      ok: false,
      msg: "token no valido",
      error
    });
  }
  next();
}
module.exports = validateToken;
