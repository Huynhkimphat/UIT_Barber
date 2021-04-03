const { show } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class EmployeeController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await show("NHANVIEN , TAIKHOAN, LUONG, NHANLUONG WHERE NHANVIEN.MANV = TAIKHOAN.MANV AND NHANVIEN.MANV = LUONG.MANV AND NHANVIEN.MANV = NHANLUONG.MANV", 0);
            let temp = formatDate(result.rows);
            res.render("employee/showEmployee", {
                employee: temp,
            });
        })();
    }
}

module.exports = new EmployeeController();