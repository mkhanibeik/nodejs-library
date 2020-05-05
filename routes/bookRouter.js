const express = require('express');
const bookController = require('../controllers/bookController');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);

  // middleware to intercept the book object and add it to the request to be used later
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        // add book to the request
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  // get all books
  bookRouter.route('/books')
    .get(controller.getAll);

  //  get book by id
  bookRouter.route('/books/:bookId')
    .get(controller.getOne);

  return bookRouter;
}

module.exports = routes;
