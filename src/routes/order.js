const express = require("express");
const router = express.Router();
const orderController = require("../app/controllers/OrderController");

router.get("/", orderController.show);
router.get("/:id/edit", orderController.edit);
router.post("/:id/edit", orderController.update);
router.get("/:id/add", orderController.add);
router.put("/", orderController.adding);
module.exports = router;