const routes = require('express').Router()
const RoomController = require('../controllers/RoomController')

routes.get('/:id', RoomController.getChatPanel)
routes.get('/:id/participants', RoomController.getRoomParticipants)
routes.get('/:id/add-participant', RoomController.gotoAddRoomParticipant)
routes.get('/:id/add-participant/:userId', RoomController.addRoomParticipant)
routes.get('/:id/delete-participant/:userId', RoomController.deleteRoomParticipant)

module.exports = routes