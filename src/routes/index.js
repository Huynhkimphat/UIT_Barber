const authenticateRouter = require("./authenticate");
const productRouter = require("./product");

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
    // Route Product
    app.use("/products", productRouter);
    // Route Home 
    app.use("/", (req, res) => {
        res.render("home", {
            login: "Login",
            register: "Register",
        });
    });

}

module.exports = route;