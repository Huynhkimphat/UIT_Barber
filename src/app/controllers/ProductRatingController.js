const { productRating } = require("../../config/db");
class ProductRatingController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await productRating.show();
            if (process.env.status == 3) {
                res.render("admin/productRating/showProductRating", {
                    productRating: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else if (process.env.status != 0) {
                res.render("productRating/showProductRating", {
                    productRating: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.render("productRating/showProductRating", {
                    productRating: result,
                });
            }
        })();
    }
    edit(req, res, next) {
        if (process.env.status == 3) {
            (async() => {
                let result = await productRating.show(req.params.id);
                res.render("admin/productRating/updateProductRating", {
                    productRating: result[0],
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            })();
        }
    }
    update(req, res, next) {
        if (process.env.status == 3) {
            (async() => {
                await product.update(
                    req.params.id,
                    req.body.name,
                    req.body.price,
                    req.body.describe,
                    req.body.country,
                    req.body.img,
                    req.body.count,
                    req.body.typeProduct
                );
                res.redirect("/productRating");
            })();
        }
    }
    add(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                res.render("admin/productRating/addProductRating", {
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.redirect("/productRating");
            }
        })();
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status == 3 || process.env.status == 2) {
                await productRating.add(
                    req.body.customerId,
                    req.body.productID,
                    req.body.rateDay,
                    req.body.ratePoint,
                    req.body.cmt,
                    req.body.Status
                );
                res.redirect("/productRating");
            } else {
                res.redirect("/");
            }
        })();
    }
    destroy(req, res, next) {
        (async() => {
            let result = await productRating.destroy(req.params.id);
        })();
        res.redirect("/productRating");
    }
}

module.exports = new ProductRatingController();