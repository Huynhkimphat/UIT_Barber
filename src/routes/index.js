const authenticateRouter = require("./authenticate");
const productRouter = require("./product");
const bookingRouter = require("./booking");
const serviceRouter = require("./service");
const employeeRouter = require("./employee");
const productTypeRouter = require("./productType");
const customerRouter = require("./customer");

function route(app) {
    // Route Login
    app.use("/authenticate", authenticateRouter);
    // Route User
    app.get("/usr=:slug", (req, res) => {
        console.log("Hi");
        res.render("home", {
            name: req.params.slug,
        });
    });
    // Route About
    app.use("/about", (req, res) => {
        res.render("about");
    });
    // Route booking
    app.use("/booking", bookingRouter);
    // Route Product
    app.use("/products", productRouter);
    // Route productType
    app.use("/productType", productTypeRouter);
    // Route Service
    app.use("/service", serviceRouter);
    // Route Customer
    app.use("/customer", customerRouter);
    // Route employee
    app.use("/employee", employeeRouter);
    // Route Home
    app.use("/", (req, res) => {
        res.render("home", {
            login: "Login",
            register: "Register",
        });
    });
}

module.exports = route;