const Router = require("express").Router();
const controller = require("../controllers/CategoriesController");

Router.post("/", controller.CreateCategory);
Router.get("/", controller.GetAllCategories);
Router.get("/main", controller.GetAllCategoriesFiltered);

module.exports = Router;

// /api/category
