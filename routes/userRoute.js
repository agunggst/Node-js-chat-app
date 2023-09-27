const routes = require('express').Router()
const UserController = require('../controllers/UserController')

routes.get('/', UserController.getUsers)
routes.get('/switch-user', UserController.gotoSwitchUser)
routes.get('/switch-user/:id', UserController.switchUser)

module.exports = routes