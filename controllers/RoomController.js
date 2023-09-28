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
      // res.json({ userData, rooms, roomMessages })
      res.render('index.ejs', { data: { userData, rooms, roomMessages }})
    } catch (error) {
      res.send(error)
    }
  }
  static async getChatPanel (req, res) {
    try {
      const userData = await UserController.checkLogin()
      const roomData = await room.findByPk(req.params.id)
      const participants = await participant.findAll({ 
        include: {
          model: user
        },
        where: { 
          roomId: req.params.id 
        } 
      })
      const messages = await message.findAll({ 
        include: {
          model: user
        },
        where: { 
          roomId: req.params.id 
        }, 
        order: [ 
          ['createdAt', 'ASC'] 
        ] 
      })
      // res.json({ userData, roomData, participants, messages })
      res.render('chatPanel.ejs', { data: { userData, roomData, participants, messages } })
    } catch (error) {
      res.send(error)
    }
  }
  static async gotoCreateRoom (req, res) {
    try {
      const userData = await UserController.checkLogin()
      res.render('createRoom.ejs', { data: { userData }})
    } catch (error) {
      res.send(error)
    }
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
      // res.json(newRoom)
      res.redirect('/')
    } catch (error) {
      res.send(error)
    }
  }
  static async getRoomParticipants (req, res) {
    try {
      const roomData = await room.findByPk(req.params.id)
      const participants = await participant.findAll({
        include: {
          model: user
        },
        where: {
          roomId: Number(req.params.id)
        }
      })
      // res.json({ data: { roomData, participants }})
      res.render('roomParticipants.ejs', { data: { roomData, participants } })
    } catch (error) {
      res.send(error)
    }
  }
  static async gotoAddRoomParticipant (req, res) {
    try {
      const roomData = await room.findByPk(req.params.id)
      const participants = await participant.findAll({
        include: {
          model: user
        },
        where: {
          roomId: Number(req.params.id)
        }
      })
      const participantsIds = participants.map(participant => {
        return participant.userId
      })
      let users = await user.findAll()
      let nonParticipants = users.filter(user => {
        return !participantsIds.includes(user.id)
      })
      // res.json({ data: { roomData, nonParticipants }})
      res.render('addParticipant.ejs', { data: { roomData, nonParticipants }})
    } catch (error) {
      res.send(error)
    }
  }
  static async addRoomParticipant (req, res) {
    try {
      await participant.create({
        userId: req.params.userId,
        roomId: req.params.id
      })
      res.redirect(`/rooms/${req.params.id}`)
    } catch (error) {
      res.send(error)
    }
  }
  static async deleteRoomParticipant (req, res) {
    try {
      await participant.destroy({
        where: {
          userId: req.params.userId,
          roomId: req.params.id
        }
      })
      // res.json(result)
      res.redirect(`/rooms/${req.params.id}`)
    } catch (error) {
      res.send(error)
    }
  } 
}

module.exports = RoomController