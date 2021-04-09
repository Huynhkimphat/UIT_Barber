const { show, productType } = require("../../config/db");
class ProductTypeController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await show("LOAISANPHAM", 0);
            res.render("productType/showProductType", {
                productType: result.rows,
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
    adding(req,res,next){
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