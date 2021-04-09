const express = require("express");
const router = express.Router();
const customerController = require("../app/controllers/CustomerController");

router.get("/", customerController.show);
router.get("/add", customerController.add);
router.get("/:id/edit", customerController.edit);
router.delete("/:id/", customerController.destroy);

module.exports = router;