const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

// express
const app = express();
const port = process.env.PORT || 4000;

// mongo db
mongoose.set('useUnifiedTopology', true);
if (process.env.ENV === 'Test') {
  mongoose.connect('mongodb://localhost/bookAPI_test', { useNewUrlParser: true });
} else {
  mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true });
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
