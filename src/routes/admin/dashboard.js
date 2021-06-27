const express = require("express");
const router = express.Router();
const dashboardController = require("../../app/controllers/admin/DashboardController");

router.get("/", dashboardController.show);

module.exports = router;
