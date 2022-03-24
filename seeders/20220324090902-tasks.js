'use strict';
const { faker } = require('@faker-js/faker');
const models = require('../models');
const sequelize = require('../models/index').sequelize;

module.exports = {
  up (queryInterface, Sequelize) {
    return sequelize.transaction(function (t) {
      const promises = [];
      promises.push(models.Task.findAndCountAll());
      promises.push(models.Agent.findAll());
      promises.push(models.Customer.findAll({attributes: ['id']}))

      return Promise.all(promises).then(res=>{
        const tasksCount = res[0].count;
        const agents = res[1];
        const customerData = res[2];

        let tasksToSeed = 300;
        tasksToSeed -= tasksCount;

        const promises = [];
        for (let i = 0; i< tasksToSeed; i++) {
          let customers = customerData[Math.floor(Math.random()*customerData.length)];
          promises.push(models.Task.create({
            title: faker.random.words(5),
            assigned: faker.datatype.boolean(),
            status: faker.helpers.randomize(['complete','deferred','in_progress']),
            deferred: faker.helpers.randomize([faker.date.past()]),
            in_progress: faker.helpers.randomize([faker.date.past()]),
            complete: faker.helpers.randomize([faker.date.past()]),
            customerId: customers.id,
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
          }, {transaction: t}));
        }
        return Promise.all(promises).then(res => {
          console.log(`[+0] ${res.length} Tasks seeded`);
          promises.length = 0;

          for(let i = 0; i < res.length; i++) {
            const agent = agents[Math.floor(Math.random() * agents.length)];
            promises.push(res[i].setAgents([agent], {transaction: t}))
          }

          return Promise.all(promises).then(res => {
            console.log(`[+] Done`);
          }).catch(err=>{
            throw err;
          })
        }).catch(err=>{
          console.error(err)
          throw err;
        })
      }).catch(err=>{
        console.log(err)
        throw err;
      })
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
