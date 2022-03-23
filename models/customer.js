'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    first_name: DataTypes.STRING,
    other_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    gender: DataTypes.ENUM,
    age: DataTypes.INTEGER,
    access_code: DataTypes.STRING,
    registration: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};