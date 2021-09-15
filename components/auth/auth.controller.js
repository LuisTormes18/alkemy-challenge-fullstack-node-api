const bcrypt = require("bcryptjs");

const { generarJWT, getUserByEmail, ExecuteQuery, hash } = require("../utils");

// Login controller
const Login = async (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, (user) => {
    if (!user) {
      return res.json({
        ok: false,
        msg: "usuario y/o contraseña incorrecta",
      });
    }
    if (!bcrypt.compareSync(password, user[0].password)) {
      return res.json({
        ok: false,
        msg: "contraseña incorrecta",
      });
    }
    const { id } = user[0].id;
    const token = generarJWT(id);

    return res.json({
      ok: true,
      msg: "Login Sucessfull!",
      user: user[0],
      token,
    });
  });
};

// register controller

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashPassword = hash(password);

  const { error } = await ExecuteQuery(`insert into user (name,email,password)
  values('${name}', '${email}', '${hashPassword}')`);
  
  if (error) {
    if (error.sqlMessage.includes("Duplicate entry")) {
      return res.json({
        ok: false,
        msg: "El correo electronico ya existe, Intente con uno nuevo",
      });
    } else {
      return res.json({
        ok: false,
        msg: "Error!!",
      });
    }
  }
  getUserByEmail(email, (user) => {
    if (user) {
      const { id } = user[0].id;
      const token = generarJWT(id);

      return res.json({
        ok: true,
        msg: "Register Sucessfull!",
        user: user[0],
        token,
      });
    }
  });
};

// Renovar Token Controller

const UpdateToken = (req, res) => {
  const { id } = req.body;
  const token = generarJWT(id);

  return res.json({
    ok: true,
    msg: "Update Token Sucessfull!",
    token,
  });
};
module.exports = {
  Login,
  Register,
  UpdateToken,
};
