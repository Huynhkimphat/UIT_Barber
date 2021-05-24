const express = require("express");
const router = express.Router();
const customerController = require("../app/controllers/CustomerController");

router.get("/", customerController.show);
router.get("/add", customerController.add); // no
router.get("/:id/edit", customerController.edit);
router.post("/:id/edit", customerController.update);
router.delete("/:id/", customerController.destroy);

module.exports = router;