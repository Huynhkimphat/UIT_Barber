// const Course = require('../models/Courses');
// const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    //* [GET]/
    home(req, res, next) {
        res.render("search");
    }

    // * [GET]/ search
    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();