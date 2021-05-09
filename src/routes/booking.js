const express = require("express");
const router = express.Router();
const bookingController = require("../app/controllers/BookingController");


router.get("/", bookingController.show);
// router.get("/add", bookingController.add);
router.put("/", bookingController.adding);
router.get("/:id/edit", bookingController.edit);
router.delete("/:id/", bookingController.destroy);


// demo AJAX 
router.get("/add", bookingController.add);
router.post("/addAjax",bookingController.ajax);
// router.use('/search', siteController.search);

module.exports = router;