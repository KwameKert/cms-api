const express = require('express');
const eventController = require('../controllers/event.controller');
const router = express.Router();

router.get('/homepage', eventController.fetchFrontPage);
// router.get('/',authMiddleware, leaderController.updateLeader);
// router.get('/:id',authMiddleware, leaderController.findLeader);
// router.get('/', authMiddleware, leaderController.fetchAllLeaders);



module.exports = router;