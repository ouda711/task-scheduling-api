'use strict';
const { faker } = require('@faker-js/faker');
const models = require('../models');
const {promise} = require("bcrypt/promises");

module.exports = {
  up (queryInterface, Sequelize) {
    const promises = [];

    promises.push(models.Comment.findAll({attributes: ['id']}));
    promises.push(models.User.findAll({attributes: ['id']}));
    promises.push(models.Task.findAll({attributes: ['id']}));

    return Promise.all(promises).then(res => {
      promises.length = 0;
      const commentsCount = res[0].length;
      const users = res[1];
      const tasks = res[2];

      let commentsToSeed = 800;
      commentsToSeed -= commentsCount;

      for (let i = 0; i < commentsToSeed; i++) {
        let user = users[Math.floor(Math.random() * users.length)];
        let task = tasks[Math.floor(Math.random() * tasks.length)];

        promises.push(models.Comment.create({
          content: faker.lorem.sentence(),
          userId: user.id,
          taskId: task.id
        }))
      }

      return Promise.all(promises).then(res => {
        promises.length = 0;
        console.log('[+] seeded comments');
      }).catch(err => {
        throw err;
      });
    }).catch(err=>{
      console.error(err)
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
