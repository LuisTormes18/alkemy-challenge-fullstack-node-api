const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

const { get, add, update, del, getBudget } = require("./budget.controller");
const validateToken = require("../../middlewares/validator-token");
const validateCampos = require("../../middlewares/validator-campos");

// Listar los registros de un usuario
router.get(
  `/`,
  [
    check("userId", "El id de usuario es obligatorio").not().isEmpty(),
    validateCampos,
    validateToken,
  ],
  get
);

// Router budget add
router.post(
  `/add`,
  [
    check("concept", "el nombre es obligatorio").not().isEmpty(),
    check("amount", "El email es obligatorio").not().isEmpty(),
    check("type", "La direccion es obligatoria").not().isEmpty(),
    check("userId", "El id de usuario es obligatorio").not().isEmpty(),
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
router.get(`/getBudget`, [validateToken], getBudget);
module.exports = router;
