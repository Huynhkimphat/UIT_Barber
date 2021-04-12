const { customer, time } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class CustomerController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let result = await customer.show();
                let temp = formatDate(result);
                res.render("customer/showCustomer", {
                    customer: temp,
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
                    // let timePeriod = await time.show();
                    // let temp = formatDate(result);
                    res.render("customer/addCustomer", {
                        // booking: temp,
                        // timePeriod: timePeriod,
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
                let result = await customer.show(req.params.id);
                let timePeriod = await time.show();
                let temp = formatDate(result);
                res.render("customer/updateCustomer", {
                    customer: temp,
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
            let result = await booking.destroy("KHACHHANG", req.params.id);
        })();
        res.redirect("/customer");
    }
}

module.exports = new CustomerController();