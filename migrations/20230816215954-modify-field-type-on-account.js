"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("accounts", "accountNumber", {
      type: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("accounts", "accountNumber", {
      type: Sequelize.INTEGER
    });
  }
};
