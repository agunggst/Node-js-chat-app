const routes = require('express').Router()
const MessageController = require('../controllers/MessageController')

routes.post('/send/:roomId', MessageController.sendMessage)

module.exports = routes