# nodejs-library
A Sample Nodejs Library Application


### insert data to DB:

Make sure mongo db is running. If not run the following command:

`mongod --config /usr/local/etc/mongod.conf`

Then run the following command to insert dummy books to the database:

`mongo bookAPI < resources/booksJson.js`