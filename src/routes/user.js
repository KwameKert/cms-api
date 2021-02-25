const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/', userController.createUser);
router.patch('/', userController.updateUser);
router.get('/:id', userController.findUser);
router.get('/', userController.findAllUsers);



module.exports = router;
