const { message } = require('../models')
const UserController = require('./UserController')

class MessageController {
  static async sendMessage (req, res) {
    try {
      const userData = await UserController.checkLogin()
      await message.create({
        userId: userData.id,
        roomId: req.params.roomId,
        message: req.body.message
      })
      res.redirect(`/rooms/${req.params.roomId}`)
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = MessageController