const {
    employee,
    time
} = require("../../config/db");
class EmployeeController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                let result = await employee.show();
                res.render("admin/employee/showEmployee", {
                    employee: result,
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
            if (process.env.status == 3) {
                res.render("admin/employee/addEmployee", {
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                    header: 2,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                await employee.add(
                    req.body.name,
                    req.body.price,
                    req.body.describe,
                    req.body.country,
                    req.body.img,
                    req.body.count,
                    req.body.typeProduct
                );
                res.redirect("/employee");
            } else {
                res.redirect("/");
            }
        })();
    }
    edit(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                let result = await employee.show(req.params.id);
                let timePeriod = await time.show();
                res.render("admin/employee/updateEmployee", {
                    employee: result[0],
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
            let result = await employee.destroy(req.params.id);
        })();
        res.redirect("/employee");
    }
    update(req, res, next) {
        if (process.env.status == 3) {
            (async() => {
                await employee.update(
                    req.params.id,
                    req.body.firstName,
                    req.body.lastName,
                    req.body.DateOfBirth,
                    req.body.sex,
                    req.body.phoneNumber,
                    req.body.address,
                    req.body.beginDate,
                    req.body.typeEmployee,
                    req.body.img,
                    req.body.email,
                    req.body.salaryId,
                    req.body.basicSalary,
                    req.body.bonusSalary,
                    req.body.salary,
                    req.body.payday,
                    req.body.status
                );
                res.redirect("/employee");
            })();
        }
    }
}

module.exports = new EmployeeController();