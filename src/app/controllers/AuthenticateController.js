// const Course = require('../models/Courses');
// const { multipleMongooseToObject } = require('../../util/mongoose');
class AuthenticateController {
    //* [GET]/
    login(req, res, next) {
        res.render("authenticate/login");
    }

    // * [GET]/ search
    create(req, res) {
        res.render("authenticate/create");
    }
}

module.exports = new AuthenticateController();