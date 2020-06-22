require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser'
import routes from './routes/bookRouter';

// express
const app = express();
const port = process.env.PORT || 4000;
const bookRouter = routes();


// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to My Fantastic Library!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
