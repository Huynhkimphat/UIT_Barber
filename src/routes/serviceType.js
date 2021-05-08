const express = require("express");
const router = express.Router();
const serviceTypeController = require("../app/controllers/ServiceTypeController");

router.get("/", serviceTypeController.show);
router.get("/add", serviceTypeController.add);
router.get("/:id/edit", serviceTypeController.edit);
router.delete("/:id/", serviceTypeController.destroy);
router.put("/", serviceTypeController.adding);
router.post("/:id/edit", serviceTypeController.update);
module.exports = router;