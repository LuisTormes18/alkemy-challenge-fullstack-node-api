const { ExecuteQuery } = require("../utils");

const getAllRecord = async (req, res) => {
  const { id } = req.params;

  const { error, result } = await ExecuteQuery(`select * from budget`);
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
};
const getByTopRecord = async (req, res) => {
  const { id, top } = req.params;

  const { error, result } = await ExecuteQuery(
    `select * from budget where userId = ${id} limit ${top} `
  );

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
};

const getByRecordType = async (req, res) => {
  const { id, type } = req.params;
  const { error, result } = await ExecuteQuery(
    `select * from budget where userId = ${id} and type = '${type}'`
  );

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
};
const add = async (req, res) => {
  const { userId, concept, amount, type, date } = req.body;

  const { error } =
    await ExecuteQuery(`insert into budget (concept,amount,date,type,userId)
  values('${concept}', ${amount}, '${date}', '${type}', ${userId})`);

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
};

const update = async (req, res) => {
  const { concept, amount, type } = req.body;
  const { id } = req.params;
  const { error } =
    await ExecuteQuery(`update budget set concept = '${concept}' ,amount = ${amount},
    type = '${type}'  where id =${id} `);

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
};

const del = async (req, res) => {
  const { id } = req.params;
  const { error } = await ExecuteQuery(`delete from budget where id =${id}`);
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
};

const getBudget = async (req, res) => {
  const { id } = req.params;
  const { error, result } = await ExecuteQuery(
    `select * from budget where userId = ${id}`
  );

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
       element.type.includes("Egress")
      ? (total_egreso = total_egreso + element.amount)
      : (total_ingreso = total_ingreso + element.amount);
  });
  const total = total_ingreso - total_egreso;

  return res.json({
    ok: true,
    msg: "Sucessfull!",
    data: { total_egreso, total_ingreso, total },
  });
};

module.exports = {
  getAllRecord,
  getByRecordType,
  getByTopRecord,
  add,
  update,
  del,
  getBudget,
};
