function bookController(Book) {
  // get all books
  function getAll(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  }

  // get a book by id
  function getOne(req, res) {
    return res.json(req.book);
  }

  return { getAll, getOne };
}

module.exports = bookController;
