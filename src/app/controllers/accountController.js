const { show } = require("../../config/db");
class accountController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await show("TAIKHOAN", 0);
            res.render("account/showAccounts", {
                account: result.rows,
            });
        })();
    }
}

module.exports = new accountController();