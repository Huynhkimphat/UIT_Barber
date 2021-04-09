const { productType, time } = require("../../config/db");
const { formatDate } = require("../../utils/formatDate");
class ProductTypeController {
    //* [GET]/
    show(req, res, next) {
        (async() => {
            let result = await productType.show();
            let temp = formatDate(result);
            res.render("productType/showProductType", {
                productType: temp,
                status: process.env.status,
                username: process.env.username,
            });
        })();
    }
    add(req, res, next) {
            (async() => {
                // let result = await booking.show(req.params.id);
                // let timePeriod = await time.show();
                // let temp = formatDate(result);
                res.render("productType/addProductType", {
                    // booking: temp,
                    // timePeriod: timePeriod,
                    status: process.env.status,
                    username: process.env.username,
                });
            })();
        }
        // AddBooking(req, res, next) {
        //     res.render("booking/addBooking");
        // }
        // Adding(req, res, next) {
        //     (async() => {
        //         let result = await addBooking(req.body.date);
        //     })();
        //     res.redirect("/booking");
        // }
    edit(req, res, next) {
        (async() => {
            let result = await booking.show(req.params.id);
            let timePeriod = await time.show();
            let temp = formatDate(result);
            res.render("productType/updateProductType", {
                productType: temp,
                timePeriod: timePeriod,
                status: process.env.status,
                username: process.env.username,
            });
        })();
    }
    destroy(req, res, next) {
        (async() => {
            let result = await productType.destroy("LOAISANPHAM", req.params.id);
        })();
        res.redirect("/productType");
    }
}

module.exports = new ProductTypeController();