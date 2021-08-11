let routes = require("express").Router();

let userRouteHandler = require("./user");
let itemRouteHandler = require("./item");
let categoryRouteHandler = require("./categories");

routes.use("/user", userRouteHandler);
routes.use("/item", itemRouteHandler);
routes.use("/category", categoryRouteHandler);

module.exports = routes;
