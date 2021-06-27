const express = require("express");
const { route } = require("./authenticate");
const router = express.Router();
const authenticateRouter = require("./authenticate");
const createRouter = require("./create");
const dashboardRouter = require("./dashboard");

router.use("/authenticate", authenticateRouter);
router.use("/create", createRouter);
router.use("/dashboard", dashboardRouter);
module.exports = router;
