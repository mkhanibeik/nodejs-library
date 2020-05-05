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

  return { getAll, getOne };
}

module.exports = bookController;
