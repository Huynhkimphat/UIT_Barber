const express = require("express");
const router = express.Router();
const bookingController = require("../app/controllers/bookingController");
const { route } = require("./authenticate");

router.get("/AddBooking", bookingController.AddBooking);
router.post("/AddBooking", bookingController.Adding);
router.get("/", bookingController.show);

// router.use('/search', siteController.search);

module.exports = router;