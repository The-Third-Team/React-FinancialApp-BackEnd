"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        name: "Restaurant",
        description: "Restaurant related transaction",
        group: "Food & Dining",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Grocery",
        description: "Grocery related transaction",
        group: "Food & Dining",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Coffee Shops",
        description: "Coffee related transaction",
        group: "Food & Dining",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Clothing",
        description: "Clothing related transaction",
        group: "Shopping",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Jewelry",
        description: "Jewelry related transaction",
        group: "Shopping",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Rent/Mortgage",
        description: "Rent/Mortgage related transaction",
        group: "Bills",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Car",
        description: "Car related transaction",
        group: "Bills",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Insurance",
        description: "Insurance related transaction",
        group: "Bills",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Utilities",
        description: "Utilities related transaction",
        group: "Bills",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Movies",
        description: "Movies related transaction",
        group: "Entertainment",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Streaming",
        description: "Streaming related transaction",
        group: "Entertainment",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Activities",
        description: "Activities related transaction",
        group: "Entertainment",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert("categories", categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories");
  }
};
