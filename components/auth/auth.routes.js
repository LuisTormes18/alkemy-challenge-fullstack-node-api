const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

const { Login, Register, UpdateToken } = require("./auth.controller");
const { validateToken, validateCampos } = require("../../middlewares");

// Router Login
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "The password is mandatory").isLength({ min: 6 }),
    validateCampos,
  ],
  Login
);
// router register
router.post(
  "/add",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "The password is mandatory").isLength({ min: 6 }),
    validateCampos,
  ],
  Register
);

//router update token
router.get("/", validateToken, UpdateToken);

module.exports = router;
