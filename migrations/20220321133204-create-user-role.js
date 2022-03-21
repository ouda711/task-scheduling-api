'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRoles', {
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references:{
          model: 'Users',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade',
      },
      roleId: {
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