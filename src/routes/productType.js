const express = require("express");
const router = express.Router();
const productTypeController = require("../app/controllers/ProductTypeController");

router.get("/", productTypeController.show);

// router.use('/search', siteController.search);

module.exports = router;