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
    addProduct(req, res, next) {
        res.render('product/addProduct');
    }
    adding(req, res, next) {
        (async() => {
            let result = await addBooking(req.body.date);

        })();
        res.redirect('/booking');
    }

}

module.exports = new ProductController();