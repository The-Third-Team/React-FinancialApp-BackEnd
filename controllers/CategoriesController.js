const { Category } = require("../models");

const CreateCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.send(newCategory);
  } catch (error) {
    throw error;
  }
};

const GetAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.send(allCategories);
  } catch (error) {
    throw error;
  }
};

const GetAllCategoriesFiltered = async (req, res) => {
  try {
    const allCategories = await Category.findAll();

    const filteredCategories = allCategories.filter(
      (item) => item.name !== "Fund"
    );
    const finalFilterCategories = filteredCategories.filter(
      (item) => item.name !== "Income"
    );

    res.send(finalFilterCategories);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateCategory,
  GetAllCategories,
  GetAllCategoriesFiltered
};
