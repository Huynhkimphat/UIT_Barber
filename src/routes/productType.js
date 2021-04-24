const express = require("express");
const router = express.Router();
const productTypeController = require("../app/controllers/ProductTypeController");
const { route } = require("./authenticate");

router.get("/", productTypeController.show);
router.get("/add", productTypeController.add);
router.get("/:id/edit", productTypeController.edit);
router.delete("/:id/", productTypeController.destroy);
router.put("/", productTypeController.adding);

module.exports = router;