'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRoles', {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references:{
          model: 'Users',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade',
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references:{
          model: 'Roles',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserRoles');
  }
};