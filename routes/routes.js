const express = require("express");
const router = express.Router();

const auth = require("../components/auth/auth.routes");
const budget = require("../components/budget/budget.routes");

// Router auth
router.use("/auth", auth);

// Router budget
router.use("/budget", budget);


module.exports = router;