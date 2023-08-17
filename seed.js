const bcrypt = require("bcrypt");
const { User, Category, Account, Budget, Transaction } = require("./models"); // Import your models
const userData = require("./seeds/users");
const categoryData = require("./seeds/categories");
const budgetData = require("./seeds/budgets");
const accountData = require("./seeds/accounts");
const transactionData = require("./seeds/transactions");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const seedDatabase = async () => {
  await User.destroy({ where: {} });
  await Category.destroy({ where: {} });
  await Account.destroy({ where: {} });
  await Budget.destroy({ where: {} });
  await Transaction.destroy({ where: {} });

  for (const user of userData) {
    // Hash the plain password using bcrypt
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    // Update the user's password with the hashed password
    user.passwordDigest = hashedPassword;
  }
  // Create the users in the database
  await User.bulkCreate(userData);

  // Create the categories in the database
  await Category.bulkCreate(categoryData);

  for (const budget of budgetData) {
    const user = await User.findOne({ where: { email: budget.userEmail } });
    budget.userId = user.id;
    const category = await Category.findOne({ where: { name: budget.name } });
    budget.categoryId = category.id;
  }

  await Budget.bulkCreate(budgetData);

  for (const account of accountData) {
    const user = await User.findOne({ where: { email: account.userEmail } });
    account.userId = user.id;
  }

  await Account.bulkCreate(accountData);

  for (const transaction of transactionData) {
    const user = await User.findOne({
      where: { email: transaction.userEmail }
    });
    transaction.userId = user.id;
    // console.log("Found userId = ", user.id);

    const category = await Category.findOne({
      where: { name: transaction.categoryName }
    });
    transaction.categoryId = category.id;
    // console.log("Found categoryId = ", category.id);

    const account = await Account.findOne({
      where: { accountNumber: transaction.accountNumber }
    });
    transaction.accountId = account.id;
    // console.log("Found accountId = ", account.id);
  }

  await Transaction.bulkCreate(transactionData);
};

seedDatabase();
