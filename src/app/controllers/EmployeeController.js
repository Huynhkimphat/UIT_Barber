const { employee, time } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class EmployeeController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let result = await employee.show();
                let temp = formatDate(result);
                res.render("employee/showEmployee", {
                    employee: temp,
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
                    res.render("employee/addEmployee", {
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
                let result = await employee.show(req.params.id);
                let timePeriod = await time.show();
                let temp = formatDate(result);
                res.render("employee/updateEmployee", {
                    employee: temp,
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
            let result = await employee.destroy("NHANVIEN", req.params.id);
        })();
        res.redirect("/employee");
    }
}

module.exports = new EmployeeController();