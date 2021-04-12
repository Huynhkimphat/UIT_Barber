const express = require("express");
const router = express.Router();
const authenticateController = require("../app/controllers/AuthenticateController");

router.get("/login", authenticateController.login);
router.post("/login", authenticateController.check);
router.get("/register", authenticateController.register);
router.post("/register", authenticateController.check);
router.get("/logout", authenticateController.check);

module.exports = router;