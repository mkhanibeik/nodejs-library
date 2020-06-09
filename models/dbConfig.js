// const dbConfig = {
//   type: 'postgres',
//   host: process.env.DATABASE_HOST,
//   port: 5432,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
// };

const dbConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'node-library',
};

module.exports = dbConfig;
