const indexR = require("./index");
const usersR = require("./users");
const studentsR = require("./students");
const teachersR = require("./teachers");
const eventsR = require("./events");
const uploadR = require("./upload");

exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/users", usersR);
    app.use("/students", studentsR);
    app.use("/teachers", teachersR);
    app.use("/events", eventsR);
    app.use("/upload", uploadR);
}