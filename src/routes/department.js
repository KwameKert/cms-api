const express = require('express');
const departmentController = require('../controllers/department.controller');
const router = express.Router();


router.post('/', departmentController.createDepartment);
router.patch('/', departmentController.updateDepartment);
router.get('/:id', departmentController.findDepartment);
router.get('/', departmentController.fetchAllDepartments);



module.exports = router;
