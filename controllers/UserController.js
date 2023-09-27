const { user } = require('../models')

class UserController {
  static async getUsers (req, res) {

  }
  static async gotoSwitchUser (req, res) {

  }
  static async switchLogin (req, res) {

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