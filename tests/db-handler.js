const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

/**
 * Get the URI to the in memory database
 */
module.exports.connect = async () => {
  const uri = await mongod.getConnectionString();

  mongoose.set('useUnifiedTopology', true);
  await mongoose.connect(uri, { useNewUrlParser: true });
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};
