const { authenticate } = require("../../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class AuthenticateController {
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
        let id;
        let img;
        let encryptedPassword = "";
        if (process.env.status == 0) {
            if (!req.body.firstName) {
                (async() => {
                    let result = await authenticate.login(req.body.email);
                    pass = result.PASSWORD;
                    img = result.HINHANH;
                    id = result.MAKH;
                    if (id) {
                        bcrypt.compare(
                            req.body.password,
                            pass,
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                    res.render("messages", {
                                        box: "error",
                                        face: "face2",
                                        mouth: "sad",
                                        heading: "Error!",
                                        desc: "oh no, something went wrong.",
                                        btn: "red",
                                        page: "./login",
                                        layout: "authenticate_layout",
                                    });
                                } else {
                                    if (result) {
                                        process.env.username =
                                            req.body.email.split("@")[0];
                                        process.env.status = 1;
                                        process.env.id = id;
                                        process.env.img = img;
                                        res.redirect("/");
                                    } else {
                                        res.render("messages", {
                                            box: "error",
                                            face: "face2",
                                            mouth: "sad",
                                            heading: "Error!",
                                            desc: "oh no, something went wrong.",
                                            btn: "red",
                                            page: "./login",
                                            layout: "authenticate_layout",
                                        });
                                    }
                                }
                            }
                        );
                    } else {
                        id = result.MANV;
                        bcrypt.compare(
                            req.body.password,
                            pass,
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                    res.render("messages", {
                                        box: "error",
                                        face: "face2",
                                        mouth: "sad",
                                        heading: "Error!",
                                        desc: "oh no, something went wrong.",
                                        btn: "red",
                                        page: "./login",
                                        layout: "authenticate_layout",
                                    });
                                } else {
                                    if (result) {
                                        process.env.username =
                                            req.body.email.split("@")[0];
                                        process.env.status = 2;
                                        process.env.id = id;
                                        process.env.img = img;
                                        res.redirect("/");
                                    } else {
                                        res.render("messages", {
                                            box: "error",
                                            face: "face2",
                                            mouth: "sad",
                                            heading: "Error!",
                                            desc: "oh no, something went wrong.",
                                            btn: "red",
                                            page: "./login",
                                            layout: "authenticate_layout",
                                        });
                                    }
                                }
                            }
                        );
                    }
                })();
            } else {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        encryptedPassword = hash;
                        (async() => {
                            await authenticate.register(
                                req.body.email,
                                encryptedPassword,
                                req.body.firstName,
                                req.body.lastName,
                                req.body.birthday,
                                "Unknown",
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
            res.redirect("/");
        }
    }
}

module.exports = new AuthenticateController();