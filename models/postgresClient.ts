import { Sequelize, Dialect } from 'sequelize';
import dbConfig from './dbConfig';
const { database, username, password, host, port, type } = dbConfig;

export default new Sequelize(database, username, password, {
  host,
  dialect: type as Dialect,
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
