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
const aboutRouter = require("./about");
const homeRouter = require("./home");

function route(app) {
    // about status : 0 <=> not login , 1 <=> login with customer , 2 <=> login with staff , 3 <=> login with admin
    // Route Login
    app.use("/authenticate", authenticateRouter);
    // Route Admin
    app.use("/admin", adminRouter);
    // Route About
    app.use("/about", aboutRouter); //header-item:3 => About
    // Route booking
    app.use("/booking", bookingRouter);
    // Route Product
    app.use("/products", productRouter); // header-item:2 => Product
    // Route ProductRating
    app.use("/productRating", productRatingRouter);
    // Route productType
    app.use("/productType", productTypeRouter);
    // Route Service
    app.use("/service", serviceRouter); //header-item:1 => Service
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
    app.use("/", homeRouter);
}

module.exports = route;