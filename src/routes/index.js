const authenticateRouter = require("./authenticate");
const productRouter = require("./product");
const productRatingRouter = require("./productRating");
const bookingRouter = require("./booking");
const serviceRouter = require("./service");
const serviceTypeRouter = require("./serviceType");
const employeeRouter = require("./employee");
const productTypeRouter = require("./productType");
const customerRouter = require("./customer");
const customerRatingRouter = require("./customerRating");
const accountRouter = require("./account");
const billRouter = require("./bill");
const adminRouter = require("./admin");

function route(app) {
    // about status : 0 <=> not login , 1 <=> login with customer , 2 <=> login with staff , 3 <=> login with admin
    // Route Login
    app.use("/authenticate", authenticateRouter);
    // Route Admin
    app.use("/admin", adminRouter);
    // Route About
    app.use("/about", (req, res) => {
        res.render("about");
    });
    // Route booking
    app.use("/booking", bookingRouter);
    // Route Product
    app.use("/products", productRouter);
    // Route ProductRating
    app.use("/productRating", productRatingRouter);
    // Route productType
    app.use("/productType", productTypeRouter);
    // Route Service
    app.use("/service", serviceRouter);
    // Route Customer
    app.use("/customer", customerRouter);
    // Route ServiceType
    app.use("/serviceType", serviceTypeRouter);
    // Route CustomerRating
    app.use("/customerRating", customerRatingRouter);
    // Route Account
    app.use("/account", accountRouter);
    // Route employee
    app.use("/employee", employeeRouter);
    // Route Bill
    app.use("/bill", billRouter);
    // Route Home
    app.use("/", (req, res) => {
        if (process.env.status != 0) {
            res.render("home", {
                status: process.env.status,
                username: process.env.username,
            });
        } else {
            res.render("home");
        }
    });
}

module.exports = route;