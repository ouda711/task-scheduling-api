'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordReset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PasswordReset.init({
    email_address: DataTypes.STRING,
    temporary_password: DataTypes.STRING,
    is_used: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PasswordReset',
  });
  return PasswordReset;
};