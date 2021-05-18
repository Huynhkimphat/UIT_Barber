const { create } = require("../../../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class CreateController {
    register(req, res) {
        if (process.env.status == 3) {
            res.render("admin/create", {
                layout: "authenticate_layout",
            });
        } else {
            res.redirect("/");
        }
    }
    check(req, res, next) {
        let encryptedPassword = "";
        if (process.env.status == 3) {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    encryptedPassword = hash;
                    (async() => {
                        await create.register(
                            req.body.email,
                            encryptedPassword,
                            req.body.firstName,
                            req.body.lastName,
                            req.body.birthday,
                            "Unknown",
                            req.body.phone
                        );
                        res.redirect("/admin/authenticate/login");
                    })();
                });
            });
        } else {
            res.redirect("/");
        }
    }
}

module.exports = new CreateController();