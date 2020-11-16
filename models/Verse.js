const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');


const Verse = sequelize.define('Verse', {
	title: DataTypes.STRING, 
	status: {
		type:DataTypes.ENUM('active', 'inactive'),
		allowNull: true
	}

});

module.exports = Verse;
