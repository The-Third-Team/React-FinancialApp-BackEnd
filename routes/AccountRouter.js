const Router = require("express").Router();
const controller = require("../controllers/AccountsController");

Router.post("/", controller.CreateAccount);
Router.get("/", controller.GetAllAccounts);
Router.get("/user/:user_id", controller.GetUserAccounts);
Router.get("/balance/:account_id", controller.GetAccountBalance);

module.exports = Router;
