const {
    customerRating,
    time
} = require("../../config/db");
class CustomerRatingController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await customerRating.show();
            if (process.env.status == 3) {
                res.render("admin/CustomerRating/showCustomerRating", {
                    customerRating: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,

                });
            } else if (process.env.status != 0) {
                res.render("CustomerRating/showCustomerRating", {
                    customerRating: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,

                });
            } else {
                res.render("CustomerRating/showCustomerRating", {
                    customerRating: result,

                });
            }
        })();
    }
    add(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                res.render("admin/customerRating/addCustomerRating", {
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                })
            } else {
                res.redirect("/");
            }
        })();
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                await customerRating.add(
                    req.body.customerId,
                    req.body.employeeId,
                    req.body.rateDay,
                    req.body.ratePoint,
                    req.body.cmt,
                    req.body.Status
                );
                res.redirect("/customerRating");
            } else {
                res.redirect("/");
            }
        })();
    }
    edit(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let result = await customerRating.show(req.params.id);
                let timePeriod = await time.show();
                let temp = formatDate(result);
                res.render("CustomerRating/updateCustomerRating", {
                    customerRating: temp,
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
    destroy(req, res, next) {
        (async() => {
            let result = await customerRating.destroy(req.params.id);
        })();
        res.redirect("/customerRating");
    }
}

module.exports = new CustomerRatingController();