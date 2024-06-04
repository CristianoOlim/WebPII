const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Alumni = sequelize.define('Alumni', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    graduationYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Alumni;
