'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.room)
      user.hasMany(models.message)
      user.belongsToMany(models.room, { through: models.participant })
    }
  }
  user.init({
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    isLogin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};