const { login, register } = require("../../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class AuthenticateController {
    //* [GET]/
    login(req, res, next) {
        if (process.env.status == 0) {
            res.render("authenticate/login", {
                layout: "authenticate_layout",
            });
        } else {
            res.redirect("/");
        }
    }
    register(req, res) {
        if (process.env.status == 0) {
            res.render("authenticate/register", {
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
                console.log("Dang nhap tai khoan");
                (async() => {
                    pass = await login(req.body.email);
                    bcrypt.compare(
                        req.body.password,
                        pass,
                        function(err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (result) {
                                    process.env.username = req.body.email.split(
                                        "@"
                                    )[0];
                                    // process.env.password = req.body.password;
                                    process.env.status = 3;
                                    res.redirect("/");
                                } else {
                                    res.redirect("/authenticate/login");
                                }
                            }
                        }
                    );
                })();
            } else {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        encryptedPassword = hash;
                        console.log("Dang Ky Tai Khoan");
                        (async() => {
                            await register(
                                req.body.email,
                                encryptedPassword,
                                req.body.firstName,
                                req.body.lastName,
                                req.body.birthday,
                                req.body.gender,
                                req.body.phone
                            );
                            res.redirect("/authenticate/login");
                        })();
                    });
                });
            }
        } else {
            process.env.status = 0;
            process.env.user = undefined;
            console.log(process.env.status);
            res.redirect("/");
        }
    }
}

module.exports = new AuthenticateController();