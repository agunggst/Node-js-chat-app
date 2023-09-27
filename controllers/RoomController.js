const { room, participant, user, message } = require('../models')

class RoomController {
  static async getUserRoom (req, res) {
    try {
      const data = await room.findAll()
      res.json(data)
    } catch (error) {
      res.send(error)
    }
  }
  static async getChatPanel (req, res) {

  }
  static async gotoCreateRoom (req, res) {

  }
  static async createRoom (req, res) {

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
  static async getRoomNonParticipants (req, res) {

  }
  static async addRoomParticipant (req, res) {

  }
  static async deleteRoomParticipant (req, res) {

  } 
}

module.exports = RoomController