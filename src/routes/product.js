const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductController");
router.get("/addProduct",productController.addProduct);
router.get("/", productController.show);
router.get("/:id/edit", productController.edit);
router.delete("/:id/", productController.destroy);


module.exports = router;