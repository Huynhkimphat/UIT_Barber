const { customer, time } = require("../../config/db");

class CustomerController {
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
            } else if (process.env.status == 1) {
                let result = await customer.show(process.env.id);
                res.render("customer/showCurrentCustomer", {
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
                res.render("customer/addCustomer", {
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
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
            } else if (process.env.status == 1) {
                let result = await customer.show(req.params.id);
                let timePeriod = await time.show();
                res.render("customer/updateCustomer", {
                    customer: result[0],
                    timePeriod: timePeriod,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            }
        })();
    }
    update(req, res, next) {
        if (process.env.status == 3 || process.env.status == 1) {
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