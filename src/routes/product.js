const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductController");

router.get("/add", productController.add);
router.put("/", productController.adding);
router.get("/", productController.show);
router.get("/:id/edit", productController.edit);
router.post("/:id/edit", productController.update);
router.delete("/:id/", productController.destroy);
router.get("/:id/viewRating", productController.viewRating);
module.exports = router;