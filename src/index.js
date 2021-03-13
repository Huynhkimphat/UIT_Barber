const path = require("path");
const morgan = require("morgan");
const express = require("express");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const route = require("./routes");
const db = require("./config/db");

const app = express();
const port = 3000;
// Connect DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

// Using Body Parser
app.use(
    express.urlencoded({
        extended: true,
    })
);
// Using Json
app.use(express.json());
// Using methods override
app.use(methodOverride("_method"));
// HTTP Logger
// app.use(morgan("combined"));
// Template Engine
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});