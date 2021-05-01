class AboutController {
    show(req, res, next) {
        if (process.env.status == 3) {
            res.render("about", {
                status: process.env.status,
                username: process.env.username,
                img: process.env.img,
                header: 3,
            });
        } else if (process.env.status == 0 || process.env.status == 2) {
            res.render("about", { header: 3 });
        } else {
            res.render("about", {
                status: process.env.status,
                username: process.env.username,
                img: process.env.img,
                header: 3,
            });
        }
    }
}

module.exports = new AboutController();