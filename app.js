const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);
require('dotenv').config();

// express
const app = express();
const port = process.env.PORT || 4000;

// mongo db
if (process.env.ENV !== 'Test') {
  mongoose.set('useUnifiedTopology', true);
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
}

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome to My Fantastic Library!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
