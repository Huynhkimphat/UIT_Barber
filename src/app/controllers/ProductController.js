const { showProduct } = require("../../config/db");
class ProductController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await showProduct();
            res.render('products/showProduct', {
                products: result.rows,
            });
        })();
    }

}

module.exports = new ProductController();