/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const bookController = require('../controllers/bookController');
const mockBooks = require('./mockBooks');

// const books = require('./mockBooks');

const mockRequest = (queryIn, bodyIn) => ({
  query: queryIn || {},
  body: bodyIn
});

jest.mock('../models/book', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const books = require('./mockBooks');
  const dbMock = new SequelizeMock();
  const model = dbMock.define('book');
  model.$queueResult([
    model.build(books[0]),
    model.build(books[1]),
    model.build(books[2]),
    model.build(books[3]),
    model.build(books[4])
  ]);
  return model;
});

describe('Book Controller Tests:', () => {
  describe('Get All Books', () => {
    it('should all books be returned.', async () => {
      // given
      const req = mockRequest();

      // when
      const controller = bookController();
      const returnedBooks = await controller.getAll(req);

      // then
      expect(returnedBooks).toHaveLength(mockBooks.length);
      expect(returnedBooks).toContainEqual(
        expect.objectContaining({ id: expect.anything() })
      );
    });

    // it('should all Crime books be returned.', async () => {
    //   // given
    //   const req = mockRequest({ genre: 'Crime' });
    //   const crimeBooks = mockBooks.filter((book) => book.genre === 'Crime');

    //   // when
    //   const controller = bookController();
    //   const returnedBooks = await controller.getAll(req);

    //   // then
    //   expect(returnedBooks).toHaveLength(crimeBooks.length);
    //   expect(returnedBooks).toContainEqual(
    //     expect.objectContaining({ id: expect.anything() })
    //   );
    // });
  });

  // describe('Get One Book', () => {
  //   it('should return one book.', async () => {
  //     // given
  //     const bookId = '507f191e810c19729de860ea';
  //     const mockBook = mockBooks[0];
  //     mockBook._id = bookId;
  //     mockingoose(model).toReturn(mockBook, 'findOne');

  //     // when
  //     const controller = bookController(model);
  //     const returnedBook = await controller.getOne(bookId);

  //     // then
  //     expect(JSON.parse(JSON.stringify(returnedBook))).toMatchObject(mockBook);
  //   });

  //   it('should return no book.', async () => {
  //     // given
  //     const bookId = '507f191e810c19729de860ea';
  //     mockingoose(model).toReturn(undefined, 'findOne');

  //     // when
  //     const controller = bookController(model);
  //     const returnedBook = await controller.getOne(bookId);

  //     // then
  //     expect(returnedBook).toBeUndefined();
  //   });
  // });

  // describe('Create Book', () => {
  //   it('should return a book with id.', async () => {
  //     // given
  //     const book = {
  //       title: 'The Time Machine',
  //       genre: 'Science Fiction',
  //       author: 'H. G. Wells',
  //       read: false
  //     };
  //     mockingoose(model).toReturn(book, 'save');

  //     // when
  //     const controller = bookController(model);
  //     const returnedBook = await controller.create(book);

  //     // then
  //     expect(returnedBook).toHaveProperty('_id');
  //   });

  //   it('Should not allow empty title.', async () => {
  //     // given
  //     const book = {
  //       genre: 'Science Fiction',
  //       author: 'H. G. Wells',
  //       read: false
  //     };

  //     // when
  //     const controller = bookController(model);
  //     await expect(controller.create(book))
  //       // then
  //       .rejects.toThrow('Title is required');
  //   });
  // });

  // describe('Update Book', () => {
  //   it('should return updated book.', async () => {
  //     // given
  //     const bookId = '507f191e810c19729de860ea';
  //     const mockBook = mockBooks[0];
  //     mockBook._id = bookId;
  //     const updatedBook = {
  //       _id: bookId,
  //       title: 'The Time Machine',
  //       genre: 'Science Fiction',
  //       author: 'H. G. Wells',
  //       read: true
  //     };
  //     mockingoose(model).toReturn(updatedBook, 'save');

  //     // when
  //     const controller = bookController(model);
  //     const returnedBook = await controller.update(mockBook, updatedBook);

  //     // then
  //     expect(JSON.parse(JSON.stringify(returnedBook))).toMatchObject(updatedBook);
  //   });

  //   it('Should not allow empty title.', async () => {
  //     // given
  //     const bookId = '507f191e810c19729de860ea';
  //     const mockBook = mockBooks[0];
  //     mockBook._id = bookId;
  //     const updatedBook = {
  //       genre: 'Science Fiction',
  //       author: 'H. G. Wells',
  //       read: false
  //     };

  //     // when
  //     const controller = bookController(model);
  //     await expect(controller.update(mockBook, updatedBook))
  //       // then
  //       .rejects.toThrow('Title is required');
  //   });
  // });

  // describe('Patch Book', () => {
  //   it('should return patched book.', async () => {
  //     // given
  //     const bookId = '507f191e810c19729de860ea';
  //     const mockBook = mockBooks[0];
  //     mockBook._id = bookId;
  //     const patchedBook = {
  //       read: true
  //     };
  //     const updatedBook = mockBook;
  //     updatedBook.read = true;
  //     mockingoose(model).toReturn(updatedBook, 'save');

  //     // when
  //     const controller = bookController(model);
  //     const returnedBook = await controller.patch(mockBook, patchedBook);

  //     // then
  //     expect(JSON.parse(JSON.stringify(returnedBook))).toMatchObject(updatedBook);
  //   });

  //   it('id should not be updated.', async () => {
  //     // given
  //     const bookId = '507f191e810c19729de860ea';
  //     const mockBook = mockBooks[0];
  //     mockBook._id = bookId;
  //     const patchedBook = {
  //       _id: '3243242342342355',
  //       read: true
  //     };
  //     const updatedBook = mockBook;
  //     updatedBook.read = true;
  //     mockingoose(model).toReturn(updatedBook, 'save');

  //     // when
  //     const controller = bookController(model);
  //     const returnedBook = await controller.patch(mockBook, patchedBook);

  //     // then
  //     expect(JSON.parse(JSON.stringify(returnedBook))).toMatchObject(updatedBook);
  //   });
  // });

  // describe('Delete Book', () => {
  //   it('should return deleted book.', async () => {
  //     // given
  //     const bookId = '507f191e810c19729de860ea';
  //     const mockBook = mockBooks[0];
  //     mockBook._id = bookId;
  //     mockingoose(model).toReturn(mockBook, 'remove');

  //     // when
  //     const controller = bookController(model);
  //     const deletedBook = await controller.remove(mockBook);

  //     // then
  //     expect(JSON.parse(JSON.stringify(deletedBook))).toMatchObject(mockBook);
  //   });

  //   it('should return no book.', async () => {
  //     // given
  //     const bookId = '507f191e810c19729de860ea';
  //     const mockBook = mockBooks[0];
  //     mockBook._id = bookId;
  //     mockingoose(model).toReturn(undefined, 'remove');

  //     // when
  //     const controller = bookController(model);
  //     const deletedBook = await controller.remove(mockBook);

  //     // then
  //     expect(deletedBook).toBeUndefined();
  //   });
  // });
});
