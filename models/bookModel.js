const mongoos = require('mongoose');

const { Schema } = mongoos;

const bookModel = new Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false }
  }
);

module.exports = mongoos.model('Book', bookModel);
