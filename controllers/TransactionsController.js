const { Transaction } = require("../models");

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

module.exports = {
  CreateTransaction,
  GetAllTransactions
};
