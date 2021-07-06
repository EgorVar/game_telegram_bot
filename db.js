const { Sequelize } = require('sequelize')


module.exports = new Sequelize(
  'telega_bot', // Имя базы данных
  'root', // Имя пользователя
  'root',// Пароль пользователя
  {
    host: '94.26.250.174',
    port: '6432',
    dialect: 'postgres'
  }
)
