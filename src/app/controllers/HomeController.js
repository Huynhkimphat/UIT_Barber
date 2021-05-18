const { product } = require("../../config/db");

class HomeController {
    show(req, res, next) {
        (async() => {
            let result = await product.show();
            if (process.env.status != 0) {
                res.render("home", {
                    product: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.render("home", {
                    product: result,
                });
            }
        })();
    }
}
module.exports = new HomeController();