const { service } = require("../../config/db");
class ServiceController {
    //* [GET]/
    show(req, res, next) {
        console.log("show");
        (async() => {
            let result = await service.show("DichVu", 0);
            res.render("services/showServices", {
                services: result.rows,
            });
        })();
    }
    add(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                res.render("services/addService", {
                    status: process.env.status,
                    username: process.env.username, 
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    adding(req,res,next){
        (async() => {
            if (process.env.status != 0) {
                await service.add(req.body.name,req.body.price,req.body.describle);
                res.redirect("/service");
            } else {
                res.redirect("/");
            }
        })();
    }

}

module.exports = new ServiceController();