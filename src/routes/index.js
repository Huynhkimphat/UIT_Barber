const authenticateRouter = require("./authenticate");

function route(app) {
    app.use("/authenticate", authenticateRouter);
    app.get("/usr=:slug", (req, res) => {
        console.log("Hi");
        res.render("home", {
            name: req.params.slug,
        });
    });
    app.use("/about", (req, res) => {
        res.render("about");
    });
    app.use("/", (req, res) => {
        res.render("home", {
            login: "Login",
            register: "Register",
        });
    });
}

module.exports = route;