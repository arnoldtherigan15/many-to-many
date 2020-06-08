'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class UserProject extends Model {
    static associate (models) {
      UserProject.belongsTo(models.Project, {
        foreignKey: 'projectId'
      })
      UserProject.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  UserProject.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserProject'
  })
  
  return UserProject;
};