const { showBooking } = require("../../config/db");
class bookingController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await showBooking("DATLICH", 0);
            res.render('booking/showBooking', {
                booking: result.rows,
            });
        })();
    }
}

module.exports = new bookingController();