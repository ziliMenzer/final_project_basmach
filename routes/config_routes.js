const indexR = require("./index");

exports.routeInit = (app) => {
    app.use("/", indexR);
}