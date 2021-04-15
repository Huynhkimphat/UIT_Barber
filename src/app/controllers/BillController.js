const { bill, time } = require("../../config/db");

class BillController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let result = await bill.show();
                res.render("bill/showBill", {
                    bill: result,
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    view(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let resultPr = await bill.viewProducts(req.params.id);
                let resultSe = await bill.viewServices(req.params.id);
                console.log(resultSe)
                if (resultSe === "[]") {
                    resultSe = [
                        ['Khong dang ki dich vu']
                    ];
                }
                res.render("bill/viewBill", {
                    Products: resultPr,
                    Services: resultSe,
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
                    res.render("bill/addBill", {
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
                let result = await bill.show(req.params.id);
                let timePeriod = await time.show();
                let temp = formatDate(result);
                res.render("bill/updateBill", {
                    bill: temp,
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
            let result = await booking.destroy("HOADON", req.params.id);
        })();
        res.redirect("/bill");
    }
}

module.exports = new BillController();