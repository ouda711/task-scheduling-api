'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    title: DataTypes.STRING,
    assigned: DataTypes.BOOLEAN,
    status: DataTypes.ENUM,
    deferred: DataTypes.DATE,
    in_progress: DataTypes.DATE,
    complete: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};