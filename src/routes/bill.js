const express = require("express");
const router = express.Router();
const BillController = require("../app/controllers/BillController");
const { route } = require("./authenticate");

router.get("/", BillController.show);
router.get("/:id/view", BillController.view);
router.get("/add", BillController.add);
router.get("/:id/edit", BillController.edit);
router.delete("/:id/", BillController.destroy);
// router.use('/search', siteController.search);

module.exports = router;