function bookController(Book) {
  // get all books
  function getAll(req) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    return Book.find(query).exec();
  }

  // get a book by id
  function getOne(bookId) {
    return Book.findById(bookId).exec();
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

    const bookToSave = new Book(originalBook);
    bookToSave.title = newBook.title;
    bookToSave.author = newBook.author;
    bookToSave.genre = newBook.genre;
    bookToSave.read = newBook.read;
    return bookToSave.save();
  }

  // patch book
  function patch(originalBook, newBook) {
    const bookToSave = new Book(originalBook);
    Object.entries(newBook).forEach((item) => {
      const key = item[0];
      const value = item[1];
      // don't update the id of the book
      if (key !== '_id') {
        bookToSave[key] = value;
      }
    });
    return bookToSave.save();
  }

  // delete book
  function remove(book) {
    const bookToDelete = new Book(book);
    return bookToDelete.remove();
  }

  return {
    getAll, getOne, create, update, patch, remove
  };
}

module.exports = bookController;
