const express = require("express");
const router = express.Router();
const employeeController = require("../app/controllers/EmployeeController");

router.get("/", employeeController.show);
router.get("/add", employeeController.add);
router.get("/:id/edit", employeeController.edit);
router.post("/:id/edit", employeeController.update);
router.delete("/:id/", employeeController.destroy);
module.exports = router;