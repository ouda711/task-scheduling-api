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
      UserRole.belongsTo(models.Role, {foreignKey:'role_id'});
      UserRole.belongsTo(models.User, {foreignKey:'user_id'});
    }
  }
  UserRole.init({
    user_id: {
      type: DataTypes.UUID,
      field: 'user_id'
    },
    role_id: {
      type: DataTypes.UUID,
      field: 'role_id'
    }
  }, {
    sequelize,
    modelName: 'UserRole',
    timestamps: false
  });
  return UserRole;
};