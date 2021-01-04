const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Sermon = sequelize.define('sermon', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        status:{
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }, 
        url: DataTypes.STRING

})



module.exports = Sermon;
