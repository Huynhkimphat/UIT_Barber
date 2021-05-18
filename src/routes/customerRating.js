const express = require("express");
const router = express.Router();
const CustomerRatingController = require("../app/controllers/CustomerRatingController");

router.get("/", CustomerRatingController.show);
router.get("/add", CustomerRatingController.add);
router.put("/", CustomerRatingController.adding);
router.get("/:id/edit", CustomerRatingController.edit);
router.delete("/:id/", CustomerRatingController.destroy);

module.exports = router;