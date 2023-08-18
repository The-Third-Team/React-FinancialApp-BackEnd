const { Budget, Transaction, Category } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

const CreateBudget = async (req, res) => {
  try {
    let budget_list = [];
    const budgets = req.body.budgets;
    for (let budget of budgets) {
      const newBudget = await Budget.create(budget);
      budget_list.push(newBudget);
    }

    //const newBudget = await Budget.create(req.body);
    res.send(budget_list);
  } catch (error) {
    throw error;
  }
};

const GetAllBudgets = async (req, res) => {
  try {
    const allBudgets = await Budget.findAll();
    res.send(allBudgets);
  } catch (error) {
    throw error;
  }
};

const GetUserBudgets = async (req, res) => {
  try {
    // Provided user ID and get all the budget data for the user
    let userId = parseInt(req.params.user_id);
    const allUserBudgets = await Budget.findAll({ where: { userId } });

    // Preping the range to get the current month transactions only
    const currentDate = moment();
    const startOfMonth = currentDate.clone().startOf("month");
    const endOfMonth = currentDate.clone().endOf("month");

    for (budget of allUserBudgets) {
      // For each budget, find all transactions relate to the budget categoryId and in the range of current month
      // Then extract the amount data.
      const transactions = await Transaction.findAll({
        where: {
          categoryId: budget.categoryId,
          date: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        },
        attributes: ["amount"]
      });

      // Sum the amount and inject the total into a new field called remaining
      const totalAmount = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
      budget.dataValues.remaining = budget.budget + totalAmount;

      // Add the budget group data for easy grouping. Get from the category object.
      const category = await Category.findByPk(budget.categoryId);
      budget.dataValues.group = category.group;
    }

    res.send(allUserBudgets);
  } catch (error) {
    throw error;
  }
};

const UpdateBudget = async (req, res) => {
  try {
    let budgetId = parseInt(req.params.budget_id);
    let updatedBudget = await Budget.update(req.body, {
      where: { id: budgetId },
      returning: true
    });
    res.send(updatedBudget);
  } catch (error) {
    throw error;
  }
};

const UpdateBulkBudgets = async (req, res) => {
  try {
    console.log("body = ", req.body);
    const oldBudgets = req.body.budgets;
    const budgets = [];
    for (const budget of oldBudgets) {
      console.log("budget = ", budget);
      const newBudget = await Budget.update(budget.data, {
        where: { id: budget.id },
        returning: true
      });
      budgets.push(newBudget[1][0]);
    }
    res.send({ budgets });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateBudget,
  GetAllBudgets,
  GetUserBudgets,
  UpdateBudget,
  UpdateBulkBudgets
};
