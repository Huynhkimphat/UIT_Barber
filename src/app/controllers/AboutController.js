class AboutController {
    show(req, res, next) {
        if (process.env.status == 3) {
            res.render("about", {
                status: process.env.status,
                username: process.env.username,
                img: process.env.img,
            });
        } else if (process.env.status == 0 || process.env.status == 2) {
            res.render("about");
        } else {
            res.render("about", {
                status: process.env.status,
                username: process.env.username,
                img: process.env.img,
            });
        }
    }
}

module.exports = new AboutController();