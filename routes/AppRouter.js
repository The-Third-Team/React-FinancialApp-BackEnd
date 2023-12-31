const Router = require("express").Router();
const AuthRouter = require("./AuthRouter");
const CategoryRouter = require("./CategoryRouter");
const BudgetRouter = require("./BudgetRouter");
const TransactionRouter = require("./TransactionRouter");
const AccountRouter = require("./AccountRouter");
Router.use("/", AuthRouter);
Router.use("/category", CategoryRouter);
Router.use("/budget", BudgetRouter);
Router.use("/transaction", TransactionRouter);
Router.use("/account", AccountRouter);
module.exports = Router;
