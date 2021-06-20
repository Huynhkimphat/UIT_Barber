const express = require("express");
const router = express.Router();
const ProductRatingController = require("../app/controllers/ProductRatingController");

router.get("/:id/add", ProductRatingController.add);
router.put("/", ProductRatingController.adding);
router.get("/", ProductRatingController.show);
router.get("/:id/edit", ProductRatingController.edit);
router.post("/:id/edit", ProductRatingController.update);
router.delete("/:id/", ProductRatingController.destroy);

module.exports = router;