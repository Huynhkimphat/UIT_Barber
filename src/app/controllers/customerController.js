const { show } = require("../../config/db");
class customerController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await show("KHACHHANG", 0);
            console.log(result);
            res.render("customer/showCustomer", {
                customer: result.rows,
            });
        })();
    }
}

module.exports = new customerController();