const { Budget, Transaction } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

const CreateBudget = async (req, res) => {
  try {
    let budget_list = [];
    console.log('req.body', req.body)
    console.log('req.body.budgets', req.body.budgets)
    const budgets = req.body.budgets
    for (let budget of budgets){
      console.log('budget', budget)
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
    let userId = parseInt(req.params.user_id);
    const allUserBudgets = await Budget.findAll({ where: { userId: userId } });
    const currentDate = moment();
    const startOfMonth = currentDate.clone().startOf("month");
    const endOfMonth = currentDate.clone().endOf("month");

    for (budget of allUserBudgets) {
      const transactions = await Transaction.findAll({
        where: {
          categoryId: budget.categoryId,
          date: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        },
        attributes: ["amount"]
      });
      const totalAmount = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
      budget.dataValues.remaining = budget.budget + totalAmount;
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

module.exports = {
  CreateBudget,
  GetAllBudgets,
  GetUserBudgets,
  UpdateBudget
};
