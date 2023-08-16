const Router = require("express").Router();
const controller = require("../controllers/TransactionsController");

Router.post("/", controller.CreateTransaction);
Router.get("/", controller.GetAllTransactions);

module.exports = Router;
