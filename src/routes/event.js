const express = require('express');
const eventController = require('../controllers/event.controller');
const router = express.Router();

router.post('/', eventController.createEvent);
//router.patch('/', leaderController.updateLeader);
//router.get('/:id', leaderController.findLeader);
//router.get('/', leaderController.fetchAllLeaders);



module.exports = router;
