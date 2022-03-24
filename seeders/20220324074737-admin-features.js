'use strict';
const bcrypt = require('bcrypt');
const models = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    return await models.Role.findOrCreate({
      where: {name: 'ROLE_ADMIN'},
      defaults: {description: 'For Admin Users'},
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
