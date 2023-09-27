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
    await queryInterface.bulkInsert('rooms', [
      {
        roomName: 'School Group',
        roomAvatar: 'https://blog.cakap.com/wp-content/uploads/2022/08/sekolahan-di-korea-selatan.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roomName: 'Basecamp',
        roomAvatar: 'https://lh3.googleusercontent.com/p/AF1QipOMjNp-CgNie_l9UcWegkBMY-mysZS5FWJwof_C=w768-h768-n-o-v1',
        userId: 1,
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
    await queryInterface.bulkDelete('rooms', null, {})
  }
};
