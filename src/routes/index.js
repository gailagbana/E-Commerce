let routes = require("express").Router();

let userRouteHandler = require("./user");
let itemRouteHandler = require("./item");
let categoryRouteHandler = require("./categories");
let cartRouteHandler = require("./cart");

routes.use("/user", userRouteHandler);
routes.use("/item", itemRouteHandler);
routes.use("/category", categoryRouteHandler);
routes.use("/cart", cartRouteHandler);

module.exports = routes;
