const { showBooking, addBooking, destroy } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class BookingController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await showBooking("DATLICH", 0);
            let temp = formatDate(result.rows);
            res.render("booking/showBooking", {
                booking: result.rows,
            });
        })();
    }
    AddBooking(req, res, next) {
        res.render("booking/addBooking");
    }
    Adding(req, res, next) {
        (async() => {
            let result = await addBooking(req.body.date);
        })();
        res.redirect("/booking");
    }
    destroy(req, res, next) {
        (async() => {
            let result = await destroy("DATLICH", req.params.id);
        })();
        res.redirect("/booking");
    }
}

module.exports = new BookingController();