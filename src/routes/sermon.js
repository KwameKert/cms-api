const express = require('express');
const sermonController = require('../controllers/sermon.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


router.get('/',authMiddleware, sermonController.fetchSermons);
router.post('/', authMiddleware, sermonController.saveSermon);
router.patch('/', authMiddleware, sermonController.updateSermon);

module.exports = router;