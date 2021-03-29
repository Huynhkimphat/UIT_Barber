const { show } = require("../../config/db");
class employeeController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await show("NHANVIEN", 0);
            console.log(result);
            res.render("employee/showEmployee", {
                employee: result.rows,
            });
        })();
    }
}

module.exports = new employeeController();