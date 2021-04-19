const { account } = require("../../config/db");

class accountController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await account.show();
            console.log(result);
            if (process.env.status == 3) {
                res.render("admin/account/showAccounts", {
                    account: result,
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