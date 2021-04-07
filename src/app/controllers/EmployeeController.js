const { show } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class EmployeeController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await show("NHANVIEN", 0);
            let temp = formatDate(result.rows);
            res.render("employee/showEmployee", {
                employee: temp,
            });
        })();
    }
}

module.exports = new EmployeeController();