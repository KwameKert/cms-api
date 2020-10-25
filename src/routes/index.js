const express = require('express');
const getUserRouter = require('./user');
const getDepartmentRouter = require('./department');
const router = express.Router();

router.use('/user', getUserRouter );
router.use('/department', getDepartmentRouter);

module.exports = router;

