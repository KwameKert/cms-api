const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Leader = require('./Leader');

const Department = sequelize.define('department', {
        name: DataTypes.STRING,
        status:{
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }, 
        content: DataTypes.TEXT,
        imageUrl: DataTypes.STRING

})

Department.hasMany(Leader);

module.exports = Department;
