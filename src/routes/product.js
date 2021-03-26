const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductController");

router.get("/", productController.show);

// router.use('/search', siteController.search);

module.exports = router;