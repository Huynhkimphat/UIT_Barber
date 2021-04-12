const { productType, time } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class ProductTypeController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await productType.show();
            let temp = formatDate(result);
            res.render("productType/showProductType", {
                productType: temp,
                status: process.env.status,
                username: process.env.username,
            });
        })();
    }
    add(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                res.render("productType/addProductType", {
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/productType");
            }
        })();
    }
    edit(req, res, next) {
        (async() => {
            let result = await booking.show(req.params.id);
            let timePeriod = await time.show();
            let temp = formatDate(result);
            res.render("productType/updateProductType", {
                productType: temp,
                timePeriod: timePeriod,
                status: process.env.status,
                username: process.env.username,
            });
        })();
    }
    destroy(req, res, next) {
        (async() => {
            let result = await productType.destroy(
                "LOAISANPHAM",
                req.params.id
            );
        })();
        res.redirect("/productType");
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                await productType.add(req.body.name);
                res.redirect("/productType/add");
            } else {
                res.redirect("/");
            }
        })();
    }
}

module.exports = new ProductTypeController();