const express = require("express");
const router = express.Router();
const bookingController = require("../app/controllers/BookingController");
const { route } = require("./authenticate");

// router.get("/AddBooking", bookingController.AddBooking);
// router.post("/AddBooking", bookingController.Adding);
router.get("/", bookingController.show);
router.delete("/:id/", bookingController.destroy);
// router.use('/search', siteController.search);

module.exports = router;
