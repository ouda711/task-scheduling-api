'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING
      },
      assigned: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.ENUM('deferred','in_progress','complete')
      },
      deferred: {
        type: Sequelize.DATE
      },
      in_progress: {
        type: Sequelize.DATE
      },
      complete: {
        type: Sequelize.DATE
      },
      customerId: {
        type: Sequelize.UUID,
        references: {
          model: 'Customers',
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
    await queryInterface.dropTable('Tasks');
  }
};