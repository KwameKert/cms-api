const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Department = require('./Department');



const Leader = sequelize.define('leader', {
    name: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
    

}, {underscored: true});

//Leader.belongsTo(Department);

module.exports = Leader;
