const express = require("express");
const router = express.Router();
const adminAuthenticateController = require("../../app/controllers/admin/AdminAuthenticateController");

router.get("/login", adminAuthenticateController.login);
router.post("/login", adminAuthenticateController.check);
router.get("/register", adminAuthenticateController.register);
router.post("/register", adminAuthenticateController.check);
router.get("/logout", adminAuthenticateController.check);

module.exports = router;