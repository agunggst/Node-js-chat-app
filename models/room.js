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
      room.belongsToMany(models.user, { through: models.participant })
    }
  }
  room.init({
    roomName: DataTypes.STRING,
    roomAvatar: {
      type: DataTypes.STRING,
      isUrl: true
    },
    userId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (room, options) => {
        if (room.roomAvatar === '' || !room.roomAvatar) {
          room.roomAvatar = 'https://cdn-icons-png.flaticon.com/512/3437/3437288.png'
        }
      }
    },
    sequelize,
    modelName: 'room',
  });
  return room;
};