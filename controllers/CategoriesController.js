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

module.exports = {
  CreateCategory,
  GetAllCategories
};
