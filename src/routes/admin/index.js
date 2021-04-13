const express = require("express");
const router = express.Router();
const authenticateRouter = require("./authenticate");
const createRouter = require("./create");

router.use("/authenticate", authenticateRouter);
router.use("/create", createRouter);
module.exports = router;