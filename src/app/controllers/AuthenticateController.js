const { login, register } = require("../../config/db");
const url = require("url");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class AuthenticateController {
    //* [GET]/
    login(req, res, next) {
        res.render("authenticate/login", { layout: "authenticate_layout" });
    }
    register(req, res) {
        res.render("authenticate/register", { layout: "authenticate_layout" });
    }
    check(req, res, next) {
        let pass;
        let encryptedPassword = "";
        if (!req.body.firstName) {
            console.log("Dang nhap tai khoan");
            (async() => {
                pass = await login(req.body.email);
                bcrypt.compare(req.body.password, pass, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        // res.redirect(
                        //     url.format({
                        //         pathname: "/",
                        //         query: {
                        //             user: 1,
                        //             b: 2,
                        //             valid: "your string here",
                        //         },
                        //     })
                        // );
                        res.redirect(
                            "/" + req.body.email.split("@")[0] + "?" + status
                        );
                    }
                });
            })();
        } else {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    encryptedPassword = hash;
                    console.log(encryptedPassword);
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
    }
}

module.exports = new AuthenticateController();