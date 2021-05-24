const { serviceType, time } = require("../../config/db");
class ServiceTypeController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await serviceType.show();
            if (process.env.status == 3) {
                res.render("admin/serviceType/showServiceType", {
                    serviceType: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else if (process.env.status != 0) {
                res.render("serviceType/showServiceType", {
                    serviceType: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.render("serviceType/showServiceType", {
                    serviceType: result,
                });
            }
        })();
    }
    add(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                res.render("admin/serviceType/addServiceType", {
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.redirect("/serviceType");
            }
        })();
    }
    edit(req, res, next) {
        if (process.env.status == 3) {
            (async() => {
                let result = await serviceType.show(req.params.id);
                let timePeriod = await time.show();
                res.render("admin/serviceType/updateServiceType", {
                    serviceType: result[0],
                    timePeriod: timePeriod,
                    status: process.env.status,
                    username: process.env.username,
                });
            })();
        }
    }
    destroy(req, res, next) {
        (async() => {
            let result = await serviceType.destroy(req.params.id);
        })();
        res.redirect("/serviceType");
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                await serviceType.add(req.body.name, req.body.status);
                res.redirect("/serviceType");
            } else {
                res.redirect("/");
            }
        })();
    }
    update(req, res, next) {
        if (process.env.status == 3) {
            (async() => {
                await serviceType.update(
                    req.params.id,
                    req.body.name,
                    req.body.status
                );
                res.redirect("/serviceType");
            })();
        }
    }
}

module.exports = new ServiceTypeController();