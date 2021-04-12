const { adminAuthenticate } = require("../../../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class AdminAuthenticateController {
    //* [GET]/
    login(req, res, next) {
        if (process.env.status == 0) {
            res.render("admin/authenticate/login", {
                layout: "authenticate_layout",
            });
        } else {
            res.redirect("/");
        }
    }
    register(req, res) {
        if (process.env.status == 0) {
            res.render("admin/authenticate/register", {
                layout: "authenticate_layout",
            });
        } else {
            res.redirect("/");
        }
    }
    check(req, res, next) {
        let pass;
        let encryptedPassword = "";
        if (process.env.status == 0) {
            if (!req.body.firstName) {
                (async() => {
                    pass = await adminAuthenticate.login(req.body.email);
                    bcrypt.compare(
                        req.body.password,
                        pass,
                        function(err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (result) {
                                    process.env.username = "Admin";
                                    process.env.status = 3;
                                    res.redirect("/");
                                } else {
                                    res.redirect("/admin/authenticate/login");
                                }
                            }
                        }
                    );
                })();
            } else {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        encryptedPassword = hash;
                        console.log("Dang Ky Tai Khoan Admin");
                        (async() => {
                            await adminAuthenticate.register(
                                req.body.email,
                                encryptedPassword,
                                req.body.firstName,
                                req.body.lastName,
                                req.body.birthday,
                                "Unknown",
                                req.body.phone
                            );
                            res.redirect("/admin/authenticate/login");
                        })();
                    });
                });
            }
        } else {
            process.env.status = 0;
            process.env.user = undefined;
            res.redirect("/");
        }
    }
}

module.exports = new AdminAuthenticateController();