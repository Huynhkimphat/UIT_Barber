const { service, serviceType } = require("../../config/db");

class ServiceController {
    //* [GET]/
    show(req, res, next) {
        (async () => {
            let result = await service.show();
            if (process.env.status == 3) {
                res.render("admin/services/showServices", {
                    service: result,
                    status: process.env.status,
                    username: process.env.username,
                });
            } else if (process.env.status != 0) {
                res.render("services/showServices", {
                    service: result,
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.render("services/showServices", {
                    service: result,
                });
            }
        })();
    }
    add(req, res, next) {
        (async () => {
            if (process.env.status != 0) {
                res.render("services/addService", {
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/services");
            }
        })();
    }
    adding(req, res, next) {
        (async () => {
            if (process.env.status != 0) {
                await service.add(
                    req.body.name,
                    req.body.price,
                    req.body.describe,
                    req.body.img
                );
                res.redirect("/service");
            } else {
                res.redirect("/");
            }
        })();
    }
    edit(req, res, next) {
        (async () => {
            let result = await service.show(req.params.id);
            let result2 = await serviceType.show();
            res.render("admin/services/updateServices", {
                service: result[0],
                serviceType: result2,
                status: process.env.status,
                username: process.env.username,
            });
        })();
    }
    destroy(req, res, next) {
        (async () => {
            let result = await service.destroy(req.params.id);
        })();
        res.redirect("/service");
    }
}

module.exports = new ServiceController();
