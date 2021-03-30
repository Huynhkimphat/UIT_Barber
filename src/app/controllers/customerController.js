const { show } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class customerController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await show("KHACHHANG, LoaiKhachHang WHERE KHACHHANG.MaKH = LoaiKhachHang.MaKH", 0);
            let temp = formatDate(result.rows);
            res.render("customer/showCustomer", {
                customer: result.rows,
            });
        })();
    }
}

module.exports = new customerController();