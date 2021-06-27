class DashboardController {
    show(req, res) {
        if (process.env.status == 3) {
            res.render("admin/dashboard", {
                status: process.env.status,
                username: process.env.username,
                img: process.env.img,
            });
        } else {
            res.redirect("/");
        }
    }
}

module.exports = new DashboardController();
