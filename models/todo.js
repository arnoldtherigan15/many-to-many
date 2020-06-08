'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Todo extends Model {
    static associate (models) {
      Todo.belongsTo(models.User,{ foreignKey: 'userId' })
      Todo.belongsTo(models.Project,{ foreignKey: 'projectId' })
    }
  }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Todo'
  })

  return Todo;
};