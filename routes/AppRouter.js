const Router = require("express").Router();
const AuthRouter = require("./AuthRouter");
const CategoryRouter = require("./CategoryRouter");
Router.use("/", AuthRouter);
Router.use("/category", CategoryRouter);
module.exports = Router;
