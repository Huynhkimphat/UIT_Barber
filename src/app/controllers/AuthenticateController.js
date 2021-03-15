// const Course = require('../models/Courses');
const { login } = require("../../config/db");
class AuthenticateController {
    //* [GET]/
    login(req, res, next) {
        res.render("authenticate/login");
    }
    check(req, res, next) {
        let result;
        if (req.body.length == 2) {
            console.log("Dang nhap tai khoan");
            (async() => {
                result = await login(req.body.email, req.body.password);
                if (result === true) {
                    console.log("Dang nhap thanh cong");
                    res.redirect("/authenticate/success");
                } else {
                    console.log("Dang nhap that bai");
                    res.redirect("/authenticate/login");
                }
            })();
        } else {
            console.log("Dang Ky Tai Khoan");
            (async() => {
                result = await login(req.body.email, req.body.password);
                if (result === true) {
                    console.log("Dang nhap thanh cong");
                    res.redirect("/authenticate/success");
                } else {
                    console.log("Dang nhap that bai");
                    res.redirect("/authenticate/login");
                }
            })();
        }
    }
    register(req, res) {
        res.render("authenticate/register");
    }
    success(req, res) {
        res.render("authenticate/success");
    }
}

module.exports = new AuthenticateController();