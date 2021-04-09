const { service, time } = require("../../config/db");

class ServiceController {
    //* [GET]/
    show(req, res, next) {
        console.log("show");
        (async() => {
            if (process.env.status != 0) {
                let result = await service.show();
                res.render("services/showServices", {
                    service: result,
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    edit(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let result = await service.show(req.params.id);
                let timePeriod = await time.show();
                console.log(timePeriod);
                res.render("service/updateService", {
                    service: result,
                    timePeriod: timePeriod,
                    status: process.env.status,
                    username: process.env.username,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    destroy(req, res, next) {
        (async() => {
            let result = await service.destroy("DICHVU", req.params.id);
        })();
        res.redirect("/service");
    }

}

module.exports = new ServiceController();