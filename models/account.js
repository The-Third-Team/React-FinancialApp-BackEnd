"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, { foreignKey: "userId" });
      Account.hasMany(models.Transaction, { foreignKey: "accountId" });
    }
  }
  Account.init(
    {
      name: DataTypes.STRING,
      accountNumber: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id"
        }
      },
      type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts"
    }
  );
  return Account;
};
