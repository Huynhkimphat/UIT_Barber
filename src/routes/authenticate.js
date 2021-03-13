const express = require("express");
const router = express.Router();
const authenticateController = require("../app/controllers/AuthenticateController");

router.use("/login", authenticateController.login);
router.use("/create", authenticateController.create);
// router.use('/search', siteController.search);

module.exports = router;