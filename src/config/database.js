const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('blog', 'root', 'ahbj',
    {
        host: 'localhost', dialect: 'mysql'
    });


module.exports = sequelize;