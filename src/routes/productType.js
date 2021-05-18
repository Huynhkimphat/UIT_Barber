const express = require("express");
const router = express.Router();
const productTypeController = require("../app/controllers/ProductTypeController");

router.get("/", productTypeController.show);
router.get("/add", productTypeController.add);
router.get("/:id/edit", productTypeController.edit);
router.post("/:id/edit", productTypeController.update);
router.delete("/:id/", productTypeController.destroy);
router.put("/", productTypeController.adding);

module.exports = router;