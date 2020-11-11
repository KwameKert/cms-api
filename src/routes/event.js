const express = require('express');
const eventController = require('../controllers/event.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.post('/', eventController.createEvent);
router.patch('/', eventController.updateEvent);
router.get('/:id',authMiddleware,  eventController.findEvent);
router.get('/', eventController.fetchEvents);


module.exports = router;
