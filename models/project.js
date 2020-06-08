'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Project extends Model {
    static associate (models) {
      Project.belongsToMany(models.User,{ 
        foreignKey: 'projectId', 
        through: 'UserProject'
      })
      Project.hasMany(models.Todo, {
        foreignKey: 'projectId'
      })
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Project'
  })

  return Project;
};