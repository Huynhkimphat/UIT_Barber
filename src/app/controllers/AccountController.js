const {
    account
} = require("../../config/db");

class accountController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await account.show();
            if (process.env.status == 3) {
                res.render("admin/account/showAccounts", {
                    account: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
}

module.exports = new accountController();