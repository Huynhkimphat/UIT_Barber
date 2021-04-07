const { booking, time } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class BookingController {
    //* [GET]/
    show(req, res, next) {
            (async() => {
                if (process.env.status != 0) {
                    let result = await booking.show();
                    let temp = formatDate(result);
                    res.render("booking/showBooking", {
                        booking: temp,
                        status: process.env.status,
                        username: process.env.username,
                    });
                } else {
                    res.redirect("/");
                }
            })();
        }
        // AddBooking(req, res, next) {
        //     res.render("booking/addBooking");
        // }
        // Adding(req, res, next) {
        //     (async() => {
        //         let result = await addBooking(req.body.date);
        //     })();
        //     res.redirect("/booking");
        // }
    edit(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let result = await booking.show(req.params.id);
                let timePeriod = await time.show();
                console.log(timePeriod);
                let temp = formatDate(result);
                res.render("booking/updateBooking", {
                    booking: temp,
                    timePeriod: timePeriod,
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    destroy(req, res, next) {
        (async() => {
            let result = await booking.destroy("DATLICH", req.params.id);
        })();
        res.redirect("/booking");
    }
}

module.exports = new BookingController();