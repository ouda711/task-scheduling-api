'use strict';
const { faker } = require('@faker-js/faker');

function genCustomers(num) {
  let customers = [];

  for (let i = 0; i < num; i++) {
    customers.push({
      id: faker.datatype.uuid(),
      first_name:               faker.name.firstName(),
      last_name:                faker.name.lastName(),
      other_name:              faker.name.middleName(),
      phone_number:             faker.phone.phoneNumber(),
      gender:                   faker.helpers.randomize(['male','female']),
      age:                      faker.datatype.number({min:18, max:65}),
      access_code:              faker.internet.password(),
      registration:             faker.helpers.randomize(['self','assisted']),
      createdAt:            faker.date.past(),
      updatedAt:            faker.date.past()
    });
  }
  return customers;
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
    return queryInterface.bulkInsert('Customers', genCustomers(200), {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
