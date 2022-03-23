'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskAgent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TaskAgent.belongsTo(models.Task, {foreignKey:'taskId'});
      TaskAgent.belongsTo(models.Agent, {foreignKey:'agentId'});
    }
  }
  TaskAgent.init({
    taskId: DataTypes.UUID,
    agentId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'TaskAgent',
    timestamps: false
  });
  return TaskAgent;
};