'use strict';
const { faker } = require('@faker-js/faker');

function genAgents(num) {
  let agents = [];

  for (let i = 0; i < num; i++) {
    agents.push({
      id: faker.datatype.uuid(),
      personel_first_name:               faker.name.firstName(),
      personel_last_name:                faker.name.lastName(),
      personel_other_name:              faker.name.middleName(),
      createdAt:            new Date(),
      updatedAt:            new Date()
    });
  }
  return agents;
}
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
    return queryInterface.bulkInsert('Agents', genAgents(20), {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Agents', null, {});
  }
};
