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
                });
            } else if (process.env.status != 0) {
                res.render("serviceType/showServiceType", {
                    serviceType: result,
                    status: process.env.status,
                    username: process.env.username,
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
            if (process.env.status != 0) {
                res.render("serviceType/addServiceType", {
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/serviceType");
            }
        })();
    }
    edit(req, res, next) {
        (async() => {
            let result = await serviceType.show(req.params.id);
            let timePeriod = await time.show();
            let temp = formatDate(result);
            res.render("serviceType/updateServiceType", {
                serviceType: temp,
                timePeriod: timePeriod,
                status: process.env.status,
                username: process.env.username,
            });
        })();
    }
    destroy(req, res, next) {
        (async() => {
            let result = await serviceType.destroy(req.params.id);
        })();
        res.redirect("/serviceType");
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                await serviceType.add(req.body.name);
                res.redirect("/serviceType/add");
            } else {
                res.redirect("/");
            }
        })();
    }
}

module.exports = new ServiceTypeController();