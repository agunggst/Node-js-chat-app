const routes = require('express').Router()
const RoomController = require('../controllers/RoomController')

routes.get('/:id', RoomController.getChatPanel)
routes.get('/:id/participants', RoomController.getRoomParticipants)
routes.get('/:id/participants/add-participant', RoomController.getRoomNonParticipants)
routes.post('/:id/participants/add-participant', RoomController.addRoomParticipant)
routes.post('/:id/participants/delete-participant', RoomController.deleteRoomParticipant)

module.exports = routes