const express = require('express');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/bookRouter')();
require('dotenv').config();

// express
const app = express();
const port = process.env.PORT || 4000;

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
