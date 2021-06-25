const { customerRating, time } = require("../../config/db");
class CustomerRatingController {
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
            } else if (process.env.status == 1) {
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
            if (process.env.status == 1) {
                res.render("customerRating/addCustomerRating", {
                    id: process.env.id,
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
            if (process.env.status == 1) {
                await customerRating.add(
                    process.env.id,
                    req.body.employeeId,
                    req.body.ratePoint,
                    req.body.Comment
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