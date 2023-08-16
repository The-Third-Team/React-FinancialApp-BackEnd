const Router = require("express").Router();
const controller = require("../controllers/TransactionsController");

Router.post("/", controller.CreateTransaction);
Router.get("/", controller.GetAllTransactions);
Router.get("/user/:user_id", controller.GetUserTransactions);
Router.get(
  "/current/user/:user_id",
  controller.GetUserCurrentMonthTransactions
);

module.exports = Router;
