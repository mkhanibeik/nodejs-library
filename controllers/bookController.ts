import Sequelize from 'sequelize';
import dbClient from '../models/postgresClient';
import Book from '../models/book';

export default function bookController() {
  const book = Book(dbClient, Sequelize);

  // get all books
  function getAll(req) {
    const query = {};
    if (req.query.genre) {
      //query.genre = req.query.genre;
    }
    return book.findAll({ where: query });
  }

  // get a book by id
  function getOne(bookId) {
    return book.findOne({ where: { id: bookId } });
  }

  // create book
  function create(newBook) {
    if (!newBook.title) {
      return Promise.reject(new Error('Title is required'));
    }
    return book.create({
      title: newBook.title,
      author: newBook.author,
      genre: newBook.genre,
      read: newBook.read
    });
  }

  // create many books
  function bulkCreate(books) {
    if (books.some(book => !book.title)) {
      return Promise.reject(new Error('Title is required'));
    }

    return book.bulkCreate(books);
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
    const updateValues = { ...newBook };
    // don't update the id of the book
    delete updateValues.id;

    return originalBook.update(updateValues);
  }

  // delete book
  function remove(bookToDelete) {
    return bookToDelete.destroy();
  }

  // delete All book
  function removeAll() {
    return book.destroy({
      where: {},
      truncate: true
    });
  }

  return {
    getAll,
    getOne,
    create,
    bulkCreate,
    update,
    patch,
    remove,
    removeAll
  };
}
