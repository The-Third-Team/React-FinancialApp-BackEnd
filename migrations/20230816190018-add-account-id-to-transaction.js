"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("transactions", "accountId", {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "accounts",
        key: "id"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("transactions", "accountId");
  }
};
