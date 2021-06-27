const { account, customer, employee, adminAuthenticate, authenticate } = require("../../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class accountController {
    show(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                console.log(process.env.admin);
                let Customer = await customer.show();
                let Employee = await employee.show();
                res.render("admin/account/showAdminAccount", {
                    email: process.env.admin,
                    customer: Customer,
                    employee: Employee,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else if (process.env.status == 2) {
                let About = await employee.show(process.env.id);
                res.render("admin/account/showEmpAccount", {
                    employeeId: req.params.id,
                    about: About,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else if (process.env.status == 1) {
                let About = await customer.show(process.env.id);
                res.render("admin/account/showCusAccount", {
                    customerId: req.params.id,
                    about: About,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    changePassword(req, res, next) {
        let pass;
        let encryptedPassword = "";
        if (process.env.status == 3) {

            (async() => {
                pass = await adminAuthenticate.login(process.env.admin);
                bcrypt.compare(
                    req.body.currentPassword,
                    pass,
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            res.send("Wrong password!");
                        } else {
                            if (result) {
                                bcrypt.genSalt(saltRounds, function(err, salt) {
                                    bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
                                        encryptedPassword = hash;
                                        (async() => {
                                            await account.changePassword(
                                                process.env.admin,
                                                encryptedPassword,
                                            );
                                            res.redirect("/account");
                                        })();
                                    });
                                });

                            } else {
                                res.send("Wrong password!");
                            }
                        }
                    }
                );
            })();
        } else if (process.env.status == 1) {
            (async() => {
                pass = await authenticate.login(req.body.email);
                bcrypt.compare(
                    req.body.currentPassword,
                    pass.PASSWORD,
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            res.send("Wrong password!");
                        } else {
                            if (result) {
                                bcrypt.genSalt(saltRounds, function(err, salt) {
                                    bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
                                        encryptedPassword = hash;
                                        (async() => {
                                            await account.changePassword(
                                                req.body.email,
                                                encryptedPassword,
                                            );
                                            res.redirect("/account");
                                        })();
                                    });
                                });

                            } else {
                                res.send("Wrong password!");
                            }
                        }
                    }
                );
            })();
        } else if (process.env.status == 2) {
            (async() => {
                pass = await authenticate.login(req.body.email);
                bcrypt.compare(
                    req.body.currentPassword,
                    pass.PASSWORD,
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            res.send("Wrong password!");
                        } else {
                            if (result) {
                                bcrypt.genSalt(saltRounds, function(err, salt) {
                                    bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
                                        encryptedPassword = hash;
                                        (async() => {
                                            await account.changePassword(
                                                req.body.email,
                                                encryptedPassword,
                                            );
                                            res.redirect("/account");
                                        })();
                                    });
                                });

                            } else {
                                res.send("Wrong password!");
                            }
                        }
                    }
                );
            })();
        }
    }
}

module.exports = new accountController();