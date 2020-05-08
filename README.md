# nodejs-library
A sample Nodejs REST-API with MnogoDB database.

### Run it

Use the following command to install the dependencies:
`npm install`

Use the following command to run the application:
`npm start`

### Test it

Use the following command to run all the unit and integration test.
`npm test`

### Insert mock data to DB:

Make sure mongo db is running. If not run the following command:
`mongod --config /usr/local/etc/mongod.conf`

Then run the following command to insert dummy books to the database:
`mongo bookAPI < resources/booksJson.js`