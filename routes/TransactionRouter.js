const Router = require("express").Router();
const controller = require("../controllers/TransactionsController");

Router.post("/", controller.CreateTransaction);
Router.get("/", controller.GetAllTransactions);
Router.get("/account/:account_id", controller.GetAccountTransactions);
Router.get("/user/:user_id", controller.GetUserTransactions);
Router.get(
  "/current/user/:user_id",
  controller.GetUserCurrentMonthTransactions
);

module.exports = Router;
