# nodejs-library
A sample Node.js REST-API with PostgreSQL database.

### Run it

Use the following command to install the dependencies:
`npm install`

Use the following command to run the application:
`npm start`

### Test it

Use the following command to run all the unit and integration test:
`npm test`

## Initialise PostgreSQL Database

Sequelize migrations is used to initialise the database (create tables and insert mock data). To perform migrations you need the [Sequelize Command-Line Interface (CLI)](https://github.com/sequelize/cli).
[Here](https://sequelize.org/master/manual/migrations.html) you find more info about Sequelize migrations.

### Running Migrations

To create tables in the DB run the following command:
`npx sequelize-cli db:migrate`

### Running Seeds

To insert mock data to the DB run the following command:
`npx sequelize-cli db:seed:all`