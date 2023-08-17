const { Transaction } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

const CreateTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create({ ...req.body });
    res.send(newTransaction);
  } catch (error) {
    throw error;
  }
};

const GetAllTransactions = async (req, res) => {
  try {
    const allTransactions = await Transaction.findAll();
    res.send(allTransactions);
  } catch (error) {
    throw error;
  }
};

const GetUserTransactions = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id);
    const allUserTransactions = await Transaction.findAll({
      where: { userId: userId }
    });
    res.send(allUserTransactions);
  } catch (error) {
    throw error;
  }
};

const GetUserCurrentMonthTransactions = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id);
    const currentDate = moment();
    const startOfMonth = currentDate.clone().startOf("month");
    const endOfMonth = currentDate.clone().endOf("month");
    const allUserTransactions = await Transaction.findAll({
      where: [
        {
          userId: userId,
          date: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        }
      ]
    });
    res.send(allUserTransactions);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateTransaction,
  GetAllTransactions,
  GetUserTransactions,
  GetUserCurrentMonthTransactions
};
