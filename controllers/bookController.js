function bookController(Book) {

  // get all books
  function getAll(req, res) {
    Book.find((err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  }

  return { getAll }
}

module.exports = bookController;
