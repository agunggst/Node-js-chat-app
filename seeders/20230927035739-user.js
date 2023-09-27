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
    await queryInterface.bulkInsert('users', [
      {
        username: 'agunggst',
        avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hpdGUlMjBtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80',
        isLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'mimsy',
        avatar: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGUlMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
        isLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'smifser',
        avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2hpdGUlMjBtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80',
        isLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'yuri',
        avatar: 'https://media.istockphoto.com/id/1157741177/photo/portrait-of-a-young-adult-asian-woman-in-venice.webp?b=1&s=170667a&w=0&k=20&c=5Td-yCCVm6yn06tUWhR2l7kUF487B7aM_eHH1RnqDu0=',
        isLogin: false,
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
    await queryInterface.bulkDelete('users', null, {})
  }
};
