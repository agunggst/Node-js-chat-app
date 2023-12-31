const routes = require('express').Router()
const userRoute = require('./userRoute')
const roomRoute = require('./roomRoute')
const messageRoute = require('./messageRoute')
const RoomController = require('../controllers/RoomController')

routes.get('/', RoomController.getUserRoom)
routes.get('/create-room', RoomController.gotoCreateRoom)
routes.post('/create-room', RoomController.createRoom)
routes.use('/users', userRoute)
routes.use('/rooms', roomRoute)
routes.use('/messages', messageRoute)

module.exports = routes