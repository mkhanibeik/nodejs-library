const Sequelize = require('sequelize');
const dbClient = require('../models/postgresClient');
const Book = require('../models/book')(dbClient, Sequelize);

function bookController() {
  // get all books
  function getAll(req) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    return Book.findAll({ where: query });
  }

  // get a book by id
  function getOne(bookId) {
    return Book.findOne({ where: { id: bookId } });
  }

  // create book
  function create(book) {
    if (!book.title) {
      return Promise.reject(new Error('Title is required'));
    }
    const bookToSave = new Book(book);
    return bookToSave.save();
  }

  // update book
  function update(originalBook, newBook) {
    if (!newBook.title) {
      return Promise.reject(new Error('Title is required'));
    }
    return originalBook.update({
      title: newBook.title,
      author: newBook.author,
      genre: newBook.genre,
      read: newBook.read
    });
  }

  // patch book
  function patch(originalBook, newBook) {
    const updateValues = {};
    Object.entries(newBook).forEach((item) => {
      const key = item[0];
      const value = item[1];
      // don't update the id of the book
      if (key !== 'id') {
        updateValues[key] = value;
      }
    });
    return originalBook.update(updateValues);
  }

  // delete book
  function remove(book) {
    return book.destroy();
  }

  return {
    getAll, getOne, create, update, patch, remove
  };
}

module.exports = bookController;
