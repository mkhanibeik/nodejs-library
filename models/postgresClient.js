const Sequelize = require('sequelize');
const {
  database,
  username,
  password,
  host,
  port,
  type
} = require('./dbConfig');

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: type,
  port,
  pool: {
    max: 5,
    min: 0,
    idle: 5000
  },
  define: {
    // prevent sequelize from pluralizing table names
    freezeTableName: true
  }
});

module.exports = sequelize;
