'use strict';
const { faker } = require('@faker-js/faker');
const models = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    let rolePromise = models.Role
        .findOrCreate({
          where: {name: 'ROLE_USER'},
          defaults: {description: 'For Authenticated users'}
        });

    let userPromise = models.User.findAndCountAll({
      attributes: ['id'],
      include: [{
        model: models.Role,
        where: {name: 'ROLE_USER'},
        through: {
          attributes: ['roleId'],
        }
      }]
    });

    return Promise.all([
      rolePromise, userPromise
    ]).then(res => {
      let userRole = res[0][0];
      const userRoleCreated = res[0][1];
      const userCount = res[1].count;
      let usersToSeed = 36;
      usersToSeed -= userCount;
      const promises = [];
      if (userRoleCreated) {
        console.log(`[+] 'ROLE_USER' role seeded successfully`);
      }

      if (usersToSeed > 0) {
        console.log(`[+] Seeding ${usersToSeed} users`);
        for (let i = 0; i < usersToSeed; i++) {
          const fname = faker.name.firstName();
          const lname = faker.name.lastName();
          promises.push(models.User.create({
            first_name: fname,
            last_name: lname,
            phone_number: faker.phone.phoneNumber(),
            email_address: fname + '.' + lname + '@gmail.com',
            password: 'password',
            is_verified: true,
            status: true
          }));
        }
      }
      return Promise.all(promises).then(res => {
        promises.length = 0;
        res.forEach(user => promises.push(user.setRoles([userRole])));
        return Promise.all(promises).then(userRoles => {
          console.log('[+] Seeded ' + res.length + ' Users');
        }).catch(err => {
          console.error('Something went wrong');
        });
      });
    }).catch(err=>{
      throw err;
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
