const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alumniId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Alumnis',
            key: 'id'
        }
    }
});

module.exports = Notification;
