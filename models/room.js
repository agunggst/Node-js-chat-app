'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      room.belongsTo(models.user)
      room.hasMany(models.message)
      // room.hasMany(models.participant)
      room.belongsToMany(models.user, { through: models.participant })
    }
  }
  room.init({
    roomName: DataTypes.STRING,
    roomAvatar: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};