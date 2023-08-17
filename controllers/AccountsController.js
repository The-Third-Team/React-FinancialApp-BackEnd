const { Account, Transaction } = require("../models");

// Create an account
const CreateAccount = async (req, res) => {
  try {
    const newAccount = await Account.create({ ...req.body });
    res.send(newAccount);
  } catch (error) {
    throw error;
  }
};

// Return all accounts
const GetAllAccounts = async (req, res) => {
  try {
    const allAccounts = await Account.findAll();
    res.send(allAccounts);
  } catch (error) {
    throw error;
  }
};

// Return accounts data given user id, the account data contain new calculated field called amount which represent the balance of the account
const GetUserAccounts = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);

    // Find account related to the user
    const allAccounts = await Account.findAll({
      where: { userId }
    });

    for (const account of allAccounts) {
      // Find only transactions that related to the account id and return only the amount field
      const transactions = await Transaction.findAll({
        where: { accountId: account.id },
        attributes: ["amount"]
      });

      // Sum all the transaction amount
      const totalAmount = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      // Inject a new field called amount with the sum
      account.dataValues.amount = totalAmount;
    }

    res.send(allAccounts);
  } catch (error) {
    throw error;
  }
};

// Return balance value given account id
const GetAccountBalance = async (req, res) => {
  try {
    const accountId = parseInt(req.params.account_id);
    const accountTransactions = await Transaction.findAll({
      where: { accountId }
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
