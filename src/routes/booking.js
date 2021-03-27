const express = require("express");
const router = express.Router();
const bookingController = require("../app/controllers/bookingController");

router.get("/", bookingController.show);

// router.use('/search', siteController.search);

module.exports = router;