const Router = require("express").Router();
const controller = require("../controllers/CategoriesController");

Router.post("/", controller.CreateCategory);
Router.get("/", controller.GetAllCategories);

module.exports = Router;
