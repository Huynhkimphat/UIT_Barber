const express = require("express");
const router = express.Router();
const bookingController = require("../app/controllers/BookingController");

router.get("/", bookingController.show);

router.get("/:id/edit", bookingController.edit);
router.delete("/:id/", bookingController.destroy);
router.get("/:id/showDetail", bookingController.showDetail);

//add
router.get("/add", bookingController.add);
router.post("/addTimePeriod", bookingController.addTimePeriod);
router.post("/addService", bookingController.addService);
router.put("/", bookingController.adding);
// not time
// router.use('/search', siteController.search);

module.exports = router;