import express from 'express';
import bookController from '../controllers/bookController';

export default function routes() {
  const bookRouter = express.Router();
  const controller = bookController();

  // middleware to intercept the book object and add it to the response locals to be used later
  bookRouter.use('/books/:bookId', (req, res, next) => {
    controller.getOne(req.params.bookId)
      .then(book => {
        if (book) {
          res.locals.book = book;
          return next();
        }
        return res.sendStatus(404);
      }, err => res.status(500).send(err));
  });

  // get all books
  bookRouter.route('/books')
    .get((req, res) => {
      controller.getAll(req)
        .then(books => {
          res.status(200);
          return res.json(books);
        }, err => res.status(500).send(err));
    });

  //  get book by id
  bookRouter.route('/books/:bookId')
    .get((req, res) => res.json(res.locals.book));

  // create book
  bookRouter.route('/books')
    .post((req, res) => {
      controller.create(req.body)
        .then(book => {
          res.status(201);
          return res.json(book);
        })
        .catch(err => res.status(400).send(err.message));
    });

  // update book
  bookRouter.route('/books/:bookId')
    .put((req, res) => {
      controller.update(res.locals.book, req.body)
        .then(book => {
          res.status(200);
          return res.json(book);
        })
        .catch(err => res.status(400).send(err.message));
    });

  // patch book
  bookRouter.route('/books/:bookId')
    .patch((req, res) => {
      controller.patch(res.locals.book, req.body)
        .then(book => {
          res.status(200);
          return res.json(book);
        })
        .catch(err => res.status(400).send(err.message));
    });

  // delete book
  bookRouter.route('/books/:bookId')
    .delete((req, res) => {
      controller.remove(res.locals.book)
        .then(() => res.sendStatus(204));
    });

  return bookRouter;
}
