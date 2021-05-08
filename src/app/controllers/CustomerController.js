const { customer, time } = require("../../config/db");

class CustomerController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                let result = await customer.show();
                res.render("admin/customer/showCustomer", {
                    customer: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
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
                        img: process.env.img,
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
            if (process.env.status == 3) {
                let result = await customer.show(req.params.id);
                let timePeriod = await time.show();
                res.render("admin/customer/updateCustomer", {
                    customer: result[0],
                    timePeriod: timePeriod,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    update(req, res, next) {
        if (process.env.status == 3) {
            (async() => {
                await customer.update(
                    req.params.id,
                    req.body.firstName,
                    req.body.lastName,
                    req.body.DateOfBirth,
                    req.body.sex,
                    req.body.phoneNumber,
                    req.body.address,
                    req.body.point,
                    req.body.img,
                    req.body.status,
                    req.body.email
                );
                res.redirect("/customer");
            })();
        }
    }
    destroy(req, res, next) {
        (async() => {
            let result = await customer.destroy(req.params.id);
        })();
        res.redirect("/customer");
    }
}

module.exports = new CustomerController();