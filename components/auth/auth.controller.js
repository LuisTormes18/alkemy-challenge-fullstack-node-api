const path = require("path");
const bcrypt = require("bcryptjs");
const { response } = require("express");

const { generarJWT } = require("./utils/generarJWT");
const hash = require("./utils/hash");
const db_connection = require("../../config/dbConnection");
const returnUser = require("./utils/returnUser");

// Login controller
const Login = async (req, res = response) => {
  const { email, password } = req.body;

  // validacion en la base de datos
  returnUser(email, (user) => {
    
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
    const token = generarJWT({ id });

    return res.json({
      ok: true,
      msg: "Login Sucessfull!",
      user: user[0],
      token,
    });
  });
 
};

// register controller

const Register = async (req, res = response) => {
  const { name, email, password } = req.body;

  const hashPassword = hash(password);

  // validacion si el usuario existe en la bse de datos
  const newUser = {
    name,
    email,
    password: hashPassword,
  };

  await db_connection.query(
    `INSERT INTO user set ?`,
    [newUser],
    (error, result) => {
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
      // return user
      returnUser(email, (user) => {
        if (user) {
          const { id } = user[0].id;
          const token = generarJWT({ id });

          return res.json({
            ok: true,
            msg: "Register Sucessfull!",
            user: user[0],
            token,
          });
        }
      });
    }
  );
};

// Renovar Token Controller

const UpdateToken = (req, res = response) => {
  const token = generarJWT(req.body);

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
