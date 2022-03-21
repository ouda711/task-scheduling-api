'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRole.belongsTo(models.Role, {foreignKey:'roleId'});
      UserRole.belongsTo(models.User, {foreignKey:'userId'});
    }
  }
  UserRole.init({
    userId: {
      type: DataTypes.UUID,
      field: 'userId'
    },
    roleId: {
      type: DataTypes.UUID,
      field: 'roleId'
    }
  }, {
    sequelize,
    modelName: 'UserRole',
    timestamps: false
  });
  return UserRole;
};