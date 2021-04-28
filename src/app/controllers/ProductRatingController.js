const { productRating, time } = require("../../config/db");
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
                });
            } else if (process.env.status != 0) {
                res.render("productRating/showProductRating", {
                    productRating: result,
                    status: process.env.status,
                    username: process.env.username,
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
                res.render("admin/products/updateProduct", {
                    product: result[0],
                    typeProduct,
                    status: process.env.status,
                    username: process.env.username,
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
                let typeProduct = await productType.showToAdd();
                res.render("admin/productRating/addProductRating", {
                    typeProduct: typeProduct,
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/products");
            }
        })();
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                await product.add(
                    req.body.name,
                    req.body.price,
                    req.body.describe,
                    req.body.country,
                    req.body.img,
                    req.body.count,
                    req.body.typeProduct
                );
                res.redirect("/products");
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