const { product, time } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class ProductController {
    //* [GET]/
    show(req, res, next) {
            (async() => {
                if (process.env.status != 0) {
                    let result = await product.show();
                    res.render("products/showProduct", {
                        product: result,
                        status: process.env.status,
                        username: process.env.username,
                    });
                } else {
                    res.redirect("/");
                }
            })();
        }
        // AddBooking(req, res, next) {
        //     res.render("booking/addBooking");
        // }
        // Adding(req, res, next) {
        //     (async() => {
        //         let result = await addBooking(req.body.date);
        //     })();
        //     res.redirect("/booking");
        // }
    edit(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let result = await product.show(req.params.id);
                let timePeriod = await time.show();
                console.log(timePeriod);
                let temp = formatDate(result);
                res.render("product/updateProduct", {
                    product: temp,
                    timePeriod: timePeriod,
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    destroy(req, res, next) {
        (async() => {
            let result = await product.destroy("SANPHAM", req.params.id);
        })();
        res.redirect("/product");
    }
}

module.exports = new ProductController();