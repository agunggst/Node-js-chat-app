const routes = require('express').Router()
const UserController = require('../controllers/UserController')

routes.get('/switch-user', UserController.getAllUsers)
routes.get('/switch-user/:id', UserController.switchLogin)

module.exports = routes