const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

const {
  getAllRecord,
  getByRecordType,
  getByTopRecord,
  add,
  update,
  del,
  getBudget,
} = require("./budget.controller"); 
const { validateToken, validateCampos } = require("../../middlewares");

router.get(`/:id`, [validateToken], getAllRecord);

// get by top record
router.get(`/get-top/:id/:top`, [validateToken], getByTopRecord);

// get by ty record
router.get(`/get-type/:id/:type`, [validateToken], getByRecordType);

// Router budget add
router.post(
  `/add`,
  [
    check("concept", "The name is required").not().isEmpty(),
    check("amount", "The amount is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
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
