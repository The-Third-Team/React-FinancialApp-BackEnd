const Router = require("express").Router();
const controller = require("../controllers/BudgetsController");

Router.post("/", controller.CreateBudget);
Router.get("/", controller.GetAllBudgets);
Router.get("/user/:user_id", controller.GetUserBudgets);
Router.put("/bulk", controller.UpdateBulkBudgets);
Router.put("/:budget_id", controller.UpdateBudget);

module.exports = Router;

// api/budget
