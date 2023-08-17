const { Account, Transaction } = require("../models");

const CreateAccount = async (req, res) => {
  try {
    const newAccount = await Account.create({ ...req.body });
    res.send(newAccount);
  } catch (error) {
    throw error;
  }
};

const GetAllAccounts = async (req, res) => {
  try {
    const allAccounts = await Account.findAll();
    res.send(allAccounts);
  } catch (error) {
    throw error;
  }
};

const GetUserAccounts = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);
    const allAccounts = await Account.findAll({
      where: { userId }
    });

    for (const account of allAccounts) {
      const transactions = await Transaction.findAll({
        where: { accountId: account.id },
        attributes: ["amount"]
      });

      const totalAmount = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      account.dataValues.amount = totalAmount;
    }

    res.send(allAccounts);
  } catch (error) {
    throw error;
  }
};

const GetAccountBalance = async (req, res) => {
  try {
    const accountId = parseInt(req.params.account_id);
    const accountTransactions = await Transaction.findAll({
      where: { accountId: accountId }
    });
    const accountBalance = accountTransactions.reduce(
      (sum, transaction) => sum + transaction.dataValues.amount,
      0
    );
    res.send({ balance: accountBalance });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateAccount,
  GetAllAccounts,
  GetAccountBalance,
  GetUserAccounts
};
