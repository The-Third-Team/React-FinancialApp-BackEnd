const Router = require("express").Router();
const controller = require("../controllers/TransactionsController");

Router.post("/", controller.CreateTransaction);
Router.post("/bulk", controller.CreateBulkTransaction);
Router.get("/", controller.GetAllTransactions);
Router.get("/account/:account_id", controller.GetAccountTransactions);
Router.get("/user/:user_id", controller.GetUserTransactions);
Router.get(
  "/user/:user_id/category/:category_id",
  controller.GetUserCategoryTransactions
);
Router.get(
  "/current/user/:user_id",
  controller.GetUserCurrentMonthTransactions
);

module.exports = Router;
