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
    // console.log(allCategories);
    // // Removing the last two objects from the array
    // const numberOfItemsToRemove = 2;
    // if (allCategories.length >= numberOfItemsToRemove) {
    //   allCategories.splice(-numberOfItemsToRemove);
    // }

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
  GetAllCategories
};
