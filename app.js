const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

// express
const app = express();
const port = process.env.PORT || 4000;

// mongo db
mongoose.set('useUnifiedTopology', true);
const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true });

app.use('/api', bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome to My Fantastic Library!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
