const { show } = require("../../config/db");
class ServiceController {
    //* [GET]/
    show(req, res, next) {
        console.log("show");
        (async() => {
            let result = await show("DichVu", 0);
            res.render("services/showServices", {
                services: result.rows,
            });
        })();
    }
    add(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                
                
                res.render("service/addService", {
                    // booking: temp,
                    status: process.env.status,
                    username: process.env.username,
                    
                });
            } else {
                res.redirect("/");
            }
        })();
    }

}

module.exports = new ServiceController();