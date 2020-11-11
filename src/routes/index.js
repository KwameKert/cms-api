const express = require('express');
const getUserRouter = require('./user');
const getDepartmentRouter = require('./department');
const getLeaderRouter = require('./leader');
const getUploadRouter = require('./upload');
const getEventRouter = require('./event');
const getAuthRouter = require('./auth');
const router = express.Router();

router.use('/user', getUserRouter );
router.use('/department', getDepartmentRouter);
router.use('/leader', getLeaderRouter);
router.use('/upload',getUploadRouter )
router.use('/event', getEventRouter);
router.use('/auth', getAuthRouter)


module.exports = router;

