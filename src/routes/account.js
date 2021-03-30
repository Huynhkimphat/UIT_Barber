const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/accountController");

router.get("/", accountController.show);

module.exports = router;