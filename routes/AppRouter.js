const Router = require("express").Router();
const AuthRouter = require("./AuthRouter");
const CategoryRouter = require("./CategoryRouter");
const BudgetRouter = require("./BudgetRouter");
Router.use("/", AuthRouter);
Router.use("/category", CategoryRouter);
Router.use("/budget", BudgetRouter);
module.exports = Router;
