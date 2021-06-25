const { order, product } = require("../../config/db");

class OrderController {
    show(req, res, next) {
        (async() => {
            let result = await order.show(process.env.id);
            if (process.env.status == 1) {
                res.render("order/showOrder", {
                    order: result,
                    status: process.env.status,
                    username: process.env.username,
                    customerID: process.env.id,
                    header: 2
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    edit(req, res, next) {
        if (process.env.status == 1) {
            (async() => {
                let result = await order.showDetail(req.params.id);
                res.render("order/updateOrder", {
                    product: result,
                    orderID: req.params.id,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                    header: 2,
                });
            })();
        }
    }
    update(req, res, next) {
        console.log(req.body.productID);
        if (process.env.status == 1) {
            (async() => {
                await order.update(
                    req.params.id,
                    req.body.productID,
                    req.body.amount
                );
                res.redirect("/order");
            })();
        }
    }
    add(req, res, next) {
        (async() => {
            if (process.env.status == 1) {
                let resProduct = await product.show(req.params.id);
                res.render("order/addProduct", {
                    product: resProduct,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                    header: 2,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status == 1) {
                console.log(req.body)
                await order.add(
                    process.env.id,
                    req.body.productID,
                    req.body.price,
                    req.body.amount
                );
                res.redirect("/products");
            } else {
                res.redirect("/");
            }
        })();
    }
}

module.exports = new OrderController();