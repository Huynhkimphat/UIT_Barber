const authenticateRouter = require("./authenticate");

function route(app) {
    app.use("/authenticate", authenticateRouter);
}

module.exports = route;