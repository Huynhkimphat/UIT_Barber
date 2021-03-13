// const meRouter = require("./me");
// const newsRouter = require("./news");
// const siteRouter = require("./site");
// const coursesRouter = require("./courses");
const authenticateRouter = require("./authenticate");

function route(app) {
    // app.use("/me", meRouter);
    // app.use("/news", newsRouter);
    // app.use("/courses", coursesRouter);
    app.use("/authenticate", authenticateRouter);
    // app.use("/", siteRouter);
}

module.exports = route;