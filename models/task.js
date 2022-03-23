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
      Task.hasMany(models.Comment, {foreignKey:'taskId'});
      Task.belongsTo(models.Customer, {foreignKey: 'customerId'});
      Task.belongsToMany(models.Agent, {through: models.TaskAgent, foreignKey:'taskId',otherKey:'agentId'})
    }
  }
  Task.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING
    },
    assigned: DataTypes.BOOLEAN,
    status: DataTypes.ENUM('deferred','in_progress','complete'),
    deferred: DataTypes.DATE,
    in_progress: DataTypes.DATE,
    complete: DataTypes.DATE,
    customerId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};