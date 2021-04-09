const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/AccountController");

router.get("/", accountController.show);

module.exports = router;