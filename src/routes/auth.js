const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/login', authController.login);
router.get('/dashboard', authController.fetchDashboard);
//router.patch('/', leaderController.updateLeader);
//router.get('/:id', leaderController.findLeader);
//router.get('/', leaderController.fetchAllLeaders);



module.exports = router;
