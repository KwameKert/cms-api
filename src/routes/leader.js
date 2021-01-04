const express = require('express');
const leaderController = require('../controllers/leader.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, leaderController.createLeader);
router.patch('/',authMiddleware, leaderController.updateLeader);
router.get('/:id',authMiddleware, leaderController.findLeader);
router.get('/', authMiddleware, leaderController.fetchAllLeaders);



module.exports = router;
