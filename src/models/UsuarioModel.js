const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definição da tabela User no banco de dados.
const User = sequelize.define('User',
    {
        username: {
            type: DataTypes.STRING, allowNull: false, unique: true
        },
        password: {
            type: DataTypes.STRING, allowNull: false
        },
        email: {
            type: DataTypes.STRING, allowNull: false, unique: true
        }
    });

module.exports = User;