const { show } = require("../../config/db");
class ProductController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await show("SANPHAM", 0);
            res.render("products/showProduct", {
                products: result.rows,
            });
        })();
    }
}

module.exports = new ProductController();