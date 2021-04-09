const { show } = require("../../config/db");
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
}

module.exports = new ProductTypeController();