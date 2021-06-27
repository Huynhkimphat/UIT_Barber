const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/AccountController");

router.get("/", accountController.show);
router.put("/", accountController.changePassword);
module.exports = router;