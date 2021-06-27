const { bill, time } = require("../../config/db");

class BillController {
    show(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                let result = await bill.show();
                res.render("admin/bill/showBill", {
                    bill: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else if (process.env.status == 0 || process.env.status == 2) {
                res.redirect("/");
            } else {
                let result = await bill.show(process.env.id);
                res.render("bill/showBill", {
                    bill: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            }
        })();
    }
    view(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let resultServices = await bill.viewServices(req.params.id);
                let total = 0;
                for (let i = 0; i < resultServices.length; i++){
                    total += resultServices[i].GIA;
                }
                if (resultServices === "[]") {
                    resultServices = [
                        ["Khong dang ki dich vu"]
                    ];
                }
                res.render("bill/viewBill", {
                    id : req.params.id,
                    total: total,
                    services: resultServices,
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
                res.render("bill/addBill", {
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status != 0) {

            } else {
                res.redirect("/");
            }
        })();
    }
    edit(req, res, next) {
        (async() => {
            if (process.env.status == 1) {
                let resultServices = await bill.viewServices(req.params.id);
                let timePeriod = await time.show();
                res.render("bill/updateBill", {
                    services: resultServices,
                    billId: req.params.id,
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
            let result = await bill.destroy(req.params.id);
        })();
        res.redirect("/bill");
    }
    checkout(req, res, next) {
        (async() => {
            let result = await bill.checkout(req.params.id);
        })();
        res.redirect("/bill");
    }
}

module.exports = new BillController();