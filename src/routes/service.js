const express = require("express");
const router = express.Router();
const serviceController = require("../app/controllers/ServiceController");

router.get("/", serviceController.show);
router.get("/add", serviceController.add);
router.put("/",serviceController.adding);

module.exports = router;