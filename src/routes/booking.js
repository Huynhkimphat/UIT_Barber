const express = require("express");
const router = express.Router();
const bookingController = require("../app/controllers/BookingController");

router.get("/", bookingController.show);

router.delete("/:id/", bookingController.destroy);
router.get("/:id/showDetail", bookingController.showDetail);

//add
router.get("/add", bookingController.add);
router.post("/addTimePeriod", bookingController.addTimePeriod);
router.post("/addService", bookingController.addService);
router.post("/updateTimePeriod", bookingController.updateTimePeriod)
router.put("/", bookingController.adding);
// not time
// router.use('/search', siteController.search);
// update
router.get("/:id/edit", bookingController.edit);
router.post("/getOldService",bookingController.getOldService);
router.put("/:id/update", bookingController.update);

module.exports = router;