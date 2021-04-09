const express = require("express");
const router = express.Router();
const productTypeController = require("../app/controllers/ProductTypeController");

router.get("/", productTypeController.show);
router.get("/add", productTypeController.add);
router.put("/",productTypeController.adding);

module.exports = router;