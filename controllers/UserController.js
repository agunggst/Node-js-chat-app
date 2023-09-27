const { user } = require('../models')
const { Op } = require("sequelize")
class UserController {
  static async getUsers (req, res) {
    try {
      const users = await user.findAll({
        where: {
          username: {
            [Op.iLike]: `%${req.query.search || ''}%`
          }
        },
        order: [
          ['username', 'ASC']
        ]
      })
      res.json(users)
    } catch (error) {
      res.send(error)
    }
  }
  static async gotoSwitchUser (req, res) {
    try {
      const users = await user.findAll()
      res.json(users)
    } catch (error) {
      res.send(error)
    }
  }
  static async switchUser (req, res) {
    try {
      await user.update({ isLogin: false }, {
        where: {
          isLogin: true
        }
      })
      await user.update({ isLogin: true }, {
        where: {
          id: req.params.id
        }
      })
      res.json({ status: 'success' })
    } catch (error) {
      res.send(error)
    }
  }
  static async checkLogin () {
    try {
      const userData = await user.findAll({
        where: {
          isLogin: true
        }
      })
      return userData[0]
    } catch (error) {
      return { status: 'error', message: error }
    }
  }
}

module.exports = UserController