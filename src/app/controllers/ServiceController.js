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
}

module.exports = new ServiceController();