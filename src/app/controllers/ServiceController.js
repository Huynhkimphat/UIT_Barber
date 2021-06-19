const { service, serviceType } = require("../../config/db");
const cpFile = require("cp-file");
class ServiceController {
    show(req, res, next) {
        (async() => {
            let result = await service.show();
            if (process.env.status == 3) {
                res.render("admin/services/showServices", {
                    service: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                    header: 1,
                });
            } else if (process.env.status != 0) {
                res.render("services/showServices", {
                    service: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                    header: 1,
                });
            } else {
                res.render("services/showServices", {
                    service: result,
                    header: 1,
                });
            }
        })();
    }
    add(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                let result = await serviceType.show();
                res.render("admin/services/addService", {
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                    header: 1,
                    serviceType: result,
                });
            } else {
                res.redirect("/service");
            }
        })();
    }
    adding(req, res, next) {
        console.log(req.body);
        (async() => {
            await cpFile(
                process.env.imgRoute + req.body.img,
                "./src/public/images/service/" + req.body.img
            );
            console.log("File copied to ./src/public/images/service/" + req.body.img);
        })();
        (async() => {
            if (process.env.status == 3) {
                console.log(req.body.name);
                console.log(req.body.price);
                console.log(req.body.describe);
                console.log(req.body.img);
                console.log(req.body.typeService);
                await service.add(
                    req.body.name,
                    req.body.price,
                    req.body.describe,
                    req.body.img,
                    req.body.typeService
                );
                res.redirect("/service");
            } else {
                res.redirect("/");
            }
        })();
    }
    update(req, res, next) {
        if (process.env.status == 3) {
            (async() => {
                await service.update(
                    req.params.id,
                    req.body.name,
                    req.body.price,
                    req.body.describe,
                    req.body.img,
                    req.body.typeService
                );
                res.redirect("/service");
            })();
        }
    }
    edit(req, res, next) {
        (async() => {
            let result = await service.show(req.params.id);
            let result2 = await serviceType.show();
            res.render("admin/services/updateServices", {
                service: result[0],
                serviceType: result2,
                status: process.env.status,
                username: process.env.username,
                img: process.env.img,
                header: 1,
            });
        })();
    }
    destroy(req, res, next) {
        (async() => {
            await service.destroy(req.params.id);
        })();
        res.redirect("/service");
    }
}

module.exports = new ServiceController();