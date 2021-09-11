const path = require("path");
const db_connection = require("../../config/dbConnection");

const get = async (req, res) => {
  const { userId } = req.body;

  await db_connection.query(
    `select * from budget where userId = ${userId} `,
    (error, result) => {
      if (error) {
        return res.json({
        ok: false,
        msg: "Error!!",
      });
      }
      return res.json({
        ok: true,
        msg: "Sucessfull!",
        data: result,
      });
    }
  );
};

const add = async (req, res) => {
  const { userId, concept, amount, type } = req.body;

  const date = new Date();

  await db_connection.query(
    `insert into budget (concept,amount,date,type,userId)
    values('${concept}', ${amount}, '${date}', ' ${type}', ${userId})`,
    (error, result) => {
      if (error) {
        return res.json({
        ok: false,
        msg: "Error!!",
      });
      }
      return res.json({
        ok: true,
        msg: "Add Sucessfull!",
      });
    }
  );
};

const update = async (req, res) => {
  const { concept, amount, type } = req.body;
  const { id } = req.params;

  await db_connection.query(
    `update budget set concept = '${concept}' ,amount = ${amount},
    type = '${type}'
    
    where id =${id} `,
    (error, result) => {
      if (error) {
         return res.json({
        ok: false,
        msg: "Error!!",
      });
      }
      return res.json({
        ok: true,
        msg: "update Sucessfull!",
      });
    }
  );
};

const del = async (req, res) => {
  const { id } = req.params;
  await db_connection.query(
    `delete from budget where id =${id} `,
    (error, result) => {
      if (error) {
        return res.json({
        ok: false,
        msg: "Error!!",
      });
      }
      return res.json({
        ok: true,
        msg: "Delete Sucessfull!",
      });
    }
  );
};

const getBudget = async (req, res) => {
  const { userId } = req.body;

  await db_connection.query(
    `select * from budget where userId = ${userId} `,
    (error, result) => {
      if (error) {
         return res.json({
        ok: false,
        msg: "Error!!",
      });
      }
      // Calculando el presupuesto actual
      let total_egreso = 0;
      let total_ingreso = 0;
      result.map((element) => {

        console.log(element.type)
        
        element.type.includes("Egreso")
          ? (total_egreso = total_egreso + element.amount)
          : (total_ingreso = total_ingreso + element.amount);
      });
      const total = total_ingreso - total_egreso;

      return res.json({
        ok: true,
        msg: "Sucessfull!",
        data: { total_egreso, total_ingreso, total },
      });
    }
  );
};

module.exports = { get, add, update, del, getBudget };
