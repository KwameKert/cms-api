const express = require('express');
const getUserRouter = require('./user');
const router = express.Router();

router.use('/user', getUserRouter );

module.exports = router;

