'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: Sequelize.STRING
      },
      taskId: {
        type: Sequelize.UUID,
        references: {
          model: 'Tasks',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model:'Users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};