const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

const { get, add, update, del, getBudget } = require("./budget.controller");
const validateToken = require("../../middlewares/validator-token");
const validateCampos = require("../../middlewares/validator-campos");

// Listar los registros de un usuario
router.get(
  `/:id`,
  [
    validateToken,
  ],
  get
);

// Router budget add
router.post(
  `/add`,
  [
    check("concept", "The name is required").not().isEmpty(),
    check("amount", "The amount is required").not().isEmpty(),
    check("type", "El Tipo es obligatorio").not().isEmpty(),
    check("date", "The date is required").not().isEmpty(),
    check("userId", "The user id is required").not().isEmpty(),
    validateCampos,
    validateToken,
  ],
  add
);

//Route para actualizar
router.put(`/update/:id`, [validateToken], update);

//Route para Eliminar 
router.delete(`/delete/:id`, [validateToken], del);

//Route para Traer el total
router.get(`/getBudget/:id`, [validateToken], getBudget);
module.exports = router;
