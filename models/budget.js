"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Budget.belongsTo(models.User, { foreignKey: "userId" });
      Budget.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Budget.init(
    {
      name: DataTypes.STRING,
      budget: DataTypes.INTEGER,
      categoryId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "categories",
          key: "id"
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id"
        }
      }
    },
    {
      sequelize,
      modelName: "Budget"
    }
  );
  return Budget;
};
