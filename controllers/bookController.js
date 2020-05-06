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
      return new Promise(() => {
        const err = 'Title is required';
        throw err;
      });
    }
    const bookToSave = new Book(book);
    return bookToSave.save();
  }

  return { getAll, getOne, create };
}

module.exports = bookController;
