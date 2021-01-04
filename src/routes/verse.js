const express = require('express');
const verseController = require('../controllers/verse.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, verseController.saveVerse);
router.get('/', authMiddleware, verseController.fetchVerses);
router.patch('/', authMiddleware, verseController.updateVerse);

module.exports = router
