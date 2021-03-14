const express = require("express");
const router = express.Router();
const authenticateController = require("../app/controllers/AuthenticateController");

router.use("/login", authenticateController.login);
router.use("/check", authenticateController.check);
router.use("/success", authenticateController.success);
router.use("/register", authenticateController.register);
// router.use('/search', siteController.search);

module.exports = router;