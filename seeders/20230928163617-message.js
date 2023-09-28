'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('messages', [
      {
        userId: 1,
        roomId: 1,
        message: `ngajak doang terus ilang ga ini`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        roomId: 1,
        message: `orangnya aja pada ilang2an`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        roomId: 1,
        message: `lah hayu, maen apa`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('messages', null, {})
  }
};
