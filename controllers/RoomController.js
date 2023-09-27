const { room, participant, user, message } = require('../models')
const { Op } = require("sequelize")
const UserController = require('./UserController')

class RoomController {
  static async getUserRoom (req, res) {
    try {
      const userData = await UserController.checkLogin()
      let userRoomIds = await participant.findAll({
        where: {
          userId: userData.id
        }
      })
      userRoomIds = userRoomIds.map(userRoomId => {
        return userRoomId.roomId
      })
      let where = { id: { [Op.or]: userRoomIds } }
      req.query.search ? where.roomName = {[Op.iLike]: `%${req.query.search}%`} : ''
      let rooms = await room.findAll({ where })
      let roomMessages = await message.findAll({ 
        where: { 
          roomId: { 
            [Op.or]: userRoomIds 
          } 
        }, 
        order: [ 
          ['createdAt', 'DESC'] 
        ] 
      })
      rooms = rooms.map(room => {
        room.message = roomMessages.find(roomMessage => roomMessage.roomId === room.id)
        return room
      })
      res.json({
        userData,
        rooms
      })
    } catch (error) {
      res.send(error)
    }
  }
  static async getChatPanel (req, res) {
    try {
      const userData = await UserController.checkLogin()
      const participants = await participant.findAll({ 
        include: {
          model: user
        },
        where: { 
          roomId: req.params.id 
        } 
      })
      const messages = await message.findAll({ 
        where: { 
          roomId: req.params.id 
        }, 
        order: [ 
          ['createdAt', 'DESC'] 
        ] 
      })
      res.json({
        userData,
        participants,
        messages
      })
    } catch (error) {
      res.send(error)
    }
  }
  static async gotoCreateRoom (req, res) {

  }
  static async createRoom (req, res) {
    try {
      const { roomName, roomAvatar } = req.body
      const userData = await UserController.checkLogin()
      const newRoom = await room.create({
        roomName,
        roomAvatar,
        userId: userData.id
      })
      await participant.create({
        userId: userData.id,
        roomId: newRoom.id
      })
      res.json(newRoom)
    } catch (error) {
      res.send(error)
    }
  }
  static async getRoomParticipants (req, res) {
    try {
      const data = await participant.findAll({
        include: {
          model: user
        },
        where: {
          roomId: Number(req.params.id)
        }
      })
      res.json(data)
    } catch (error) {
      res.send(error)
    }
  }
  static async addRoomParticipant (req, res) {
    try {
      const result = await participant.create({
        userId: req.params.userId,
        roomId: req.params.id
      })
      res.json(result)
    } catch (error) {
      res.send(error)
    }
  }
  static async deleteRoomParticipant (req, res) {
    try {
      const result = await participant.destroy({
        where: {
          userId: req.params.userId,
          roomId: req.params.id
        }
      })
      res.json(result)
    } catch (error) {
      res.send(error)
    }
  } 
}

module.exports = RoomController