'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaskAgents', {
      taskId: {
        type: Sequelize.UUID,
        references: {
          model:'Tasks',
          key:'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      agentId: {
        type: Sequelize.UUID,
        references: {
          model: 'Agents',
          key:'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TaskAgents');
  }
};