const { show } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class customerController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await show("KHACHHANG, LoaiKhachHang, TAIKHOAN WHERE KHACHHANG.MAKH = LOAIKHACHHANG.MAKH AND KHACHHANG.MAKH = TAIKHOAN.MAKH", 0);
            let temp = formatDate(result.rows);
            res.render("customer/showCustomer", {
                customer: temp,
            });
        })();
    }
}

module.exports = new customerController();