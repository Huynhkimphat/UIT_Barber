const authenticateRouter = require("./authenticate");

function route(app) {
    app.use("/authenticate", authenticateRouter);
    app.get("/usr=:slug#:pass", (req, res) => {
        res.render("home", {
            name: req.params.slug,
        });
    });
    app.use("/", (req, res) => {
        res.render("home", {
            login: "Login",
            register: "Register",
        });
    });
}

module.exports = route;