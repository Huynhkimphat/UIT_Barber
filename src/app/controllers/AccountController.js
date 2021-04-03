const { show } = require("../../config/db");
class accountController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await show("TAIKHOAN", 0);
            if (process.env.status != 0) {
                res.render("account/showAccounts", {
                    account: result.rows,
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
}

module.exports = new accountController();