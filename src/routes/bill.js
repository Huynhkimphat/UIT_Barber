const express = require("express");
const router = express.Router();
const billController = require("../app/controllers/BillController");

router.get("/", billController.show);
router.get("/add", billController.add);
router.get("/:id/edit", billController.edit);
router.delete("/:id/", billController.destroy);
// router.use('/search', siteController.search);

module.exports = router;