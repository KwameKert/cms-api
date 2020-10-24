const sequelize = require('../config/db');
const { Sequelize, DataTypes, Model}  = require('sequelize');

    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin','media', 'editor' ),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address"
                }
            }
        }
    });


module.exports =  User;
