const { employee, time, authenticate } = require("../../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cpFile = require("cp-file");
class EmployeeController {
    show(req, res, next) {
        (async () => {
            if (process.env.status == 3) {
                let result = await employee.show();
                res.render("admin/employee/showEmployee", {
                    employee: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else if (process.env.status == 2) {
                let result = await employee.show(process.env.id);
                res.render("Employee/showCurrentEmployee", {
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
        (async () => {
            if (process.env.status == 3) {
                let existedPhoneNumber = await employee.checkPhoneNumber();
                let existedEmail = await employee.checkEmail();
                res.render("admin/employee/addEmployee", {
                    existedPhoneNumber: existedPhoneNumber,
                    existedEmail: existedEmail,
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
        (async () => {
            if (process.env.status == 3) {
                let id = await employee.add(
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
                    req.body.basicSalary
                );
                let Pass = "";
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        Pass = hash;
                        (async () => {
                            await authenticate.registerForAdmin(Pass, id);
                        })();
                    });
                });
                res.redirect("/employee");
            } else {
                res.redirect("/");
            }
        })();
    }
    edit(req, res, next) {
        (async () => {
            if (process.env.status == 3) {
                let existedPhoneNumber = await employee.checkPhoneNumber();
                let result = await employee.show(req.params.id);
                let timePeriod = await time.show();
                res.render("admin/employee/updateEmployee", {
                    existedPhoneNumber: existedPhoneNumber,
                    employee: result[0],
                    timePeriod: timePeriod,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else if (process.env.status == 2) {
                let existedPhoneNumber = await employee.checkPhoneNumber();
                let result = await employee.show(req.params.id);
                let timePeriod = await time.show();
                res.render("employee/updateEmployee", {
                    existedPhoneNumber: existedPhoneNumber,
                    employee: result[0],
                    timePeriod: timePeriod,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            }
        })();
    }
    destroy(req, res, next) {
        (async () => {
            let result = await employee.destroy(req.params.id);
        })();
        res.redirect("/employee");
    }
    update(req, res, next) {
        if (process.env.status == 3 || process.env.status == 2) {
            (async () => {
                await cpFile(
                    process.env.imgRoute + req.body.img,
                    "./src/public/images/employee/" + req.body.img
                );
                console.log(
                    "File copied to ./src/public/images/employee/" +
                        req.body.img
                );
            })();
            (async () => {
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
                res.redirect("/account");
            })();
        }
    }
}

module.exports = new EmployeeController();
