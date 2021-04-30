const {
    product,
    time,
    productType,
    productRating
} = require("../../config/db");
class ProductController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await product.show();
            if (process.env.status == 3) {
                res.render("admin/products/showProduct", {
                    product: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,

                });
            } else if (process.env.status != 0) {
                res.render("products/showProduct", {
                    product: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,

                });
            } else {
                res.render("products/showProduct", {
                    product: result,

                });
            }
        })();
    }
    edit(req, res, next) {
        if (process.env.status == 3) {
            (async() => {
                let result = await product.show(req.params.id);
                let typeProduct = await productType.showToAdd();
                res.render("admin/products/updateProduct", {
                    product: result[0],
                    typeProduct,
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
                res.redirect("/products");
            })();
        }
    }
    add(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                let typeProduct = await productType.showToAdd();
                res.render("admin/products/addProduct", {
                    typeProduct: typeProduct,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,

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
            let result = await product.destroy(req.params.id);
        })();
        res.redirect("/products");
    }
    viewRating(req, res, next) {
        (async() => {
            let result = await productRating.show(req.params.id);
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
}

module.exports = new ProductController();