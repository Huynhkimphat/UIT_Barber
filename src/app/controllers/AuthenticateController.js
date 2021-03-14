// const Course = require('../models/Courses');
const { login } = require("../../config/db");
class AuthenticateController {
    //* [GET]/
    login(req, res, next) {
        res.render("authenticate/login");
    }
    check(req, res, next) {
            let result;
            (async() => {
                result = await login(req.body.username, req.body.password);
                if (result === true) console.log("Dang nhap thanh cong");
                else {
                    console.log("Dang nhap that bai");
                }
            })();
            res.redirect("/authenticate/login");
        }
        // * [GET]/ search
    register(req, res) {
        res.render("authenticate/register");
    }
}

module.exports = new AuthenticateController();