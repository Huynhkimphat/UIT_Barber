const express = require("express");
const router = express.Router();
const createController = require("../../app/controllers/admin/CreateController");

router.get("/", createController.register);
router.post("/", createController.check);

module.exports = router;