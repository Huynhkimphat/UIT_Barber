const express = require("express");
const router = express.Router();
const employeeController = require("../app/controllers/EmployeeController");

router.get("/", employeeController.show);

module.exports = router;