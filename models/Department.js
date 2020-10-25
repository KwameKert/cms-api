const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');


const Department = sequelize.define('department', {
        name: DataTypes.STRING,
        status:{
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }, 
        content: DataTypes.TEXT

})


module.exports = Department;
