const express = require("express");
const router = express.Router();
const AboutController = require("../app/controllers/AboutController");

router.get("/", AboutController.show);

module.exports = router;