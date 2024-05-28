const express = require('express')
const router = express.Router()
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController')

router.get('/', getEvents)
router.post('/create', createEvent)
router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)

module.exports = router