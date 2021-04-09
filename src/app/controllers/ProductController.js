const { product, time, productType } = require("../../config/db");
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
    add(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let typeProduct = await productType.showToAdd();
                res.render("products/addProduct", {
                    typeProduct: typeProduct,
                    status: process.env.status,
                    username: process.env.username, 
                });
            } else {
                res.redirect("/products");
            }
        })();
    }
    adding(req,res,next){
        (async() => {
            if (process.env.status != 0) {
                await product.add(req.body.name,req.body.price,req.body.describe,req.body.country,req.body.img,req.body.count,req.body.typeProduct);
                res.redirect("/products");
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