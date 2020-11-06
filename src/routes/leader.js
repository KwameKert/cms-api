
const express = require('express');
const leaderController = require('../controllers/leader.controller');
const router = express.Router();

router.post('/', leaderController.createLeader);
router.patch('/', leaderController.updateLeader);
router.get('/:id', leaderController.findLeader);
router.get('/', leaderController.fetchAllLeaders);



module.exports = router;
