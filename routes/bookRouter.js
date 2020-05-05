const express = require('express');
const bookController = require('../controllers/bookController');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);

  // get all books
  bookRouter.route('/books')
    .get(controller.getAll);

  return bookRouter;
}

module.exports = routes;
