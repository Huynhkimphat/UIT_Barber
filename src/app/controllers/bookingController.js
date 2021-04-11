const { booking, time, employee, service } = require("../../config/db");
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
    add(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                // let result = await booking.show(req.params.id);
                let timePeriod = await time.show();
                let employeeName = await employee.showToAdd();
                let serviceName = await service.showToAdd();
                let d = new Date();
                let dayString = d.toLocaleDateString("en-GB");
                let day = [
                    [dayString]
                ];
                d.setDate(d.getDate() + 1);
                dayString = d.toLocaleDateString("en-GB");
                day.push([dayString]);
                d.setDate(d.getDate() + 1);
                dayString = d.toLocaleDateString("en-GB");
                day.push([dayString]);
                res.render("booking/addBooking", {
                    // booking: temp,
                    day: day,
                    timePeriod: timePeriod,
                    employeeName: employeeName,
                    serviceName: serviceName,
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                await booking.add(
                    req.body.date,
                    req.body.time,
                    req.body.employee,
                    req.body.service
                );
                res.redirect("/booking");
            } else {
                res.redirect("/");
            }
        })();
    }
    edit(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let result = await booking.show(req.params.id);
                let timePeriod = await time.show();
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