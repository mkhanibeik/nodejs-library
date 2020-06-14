/* eslint-disable global-require */
/* eslint-disable no-undef */
const bookController = require('../controllers/bookController');
const mockBooks = require('./mockBooks');

const mockRequest = (queryIn, bodyIn) => ({
  query: queryIn || {},
  body: bodyIn
});

jest.mock('../models/book', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const books = require('./mockBooks');

  const dbMock = new SequelizeMock();
  const model = dbMock.define('book');
  model.$queueResult(
    books.map((book) => model.build(book))
  );
  model.$queryInterface.$useHandler((query, options) => {
    if (query === 'findOne') {
      const foundBook = books.find((book) => book.id === options[0].where.id);
      // promise should be used to really return undefined
      if (!foundBook) return Promise.resolve(undefined);
      return foundBook;
    }
    if (query === 'findAll' && options[0].where.genre) {
      return books.filter((book) => book.genre === options[0].where.genre);
    }
    if (query === 'destroy') {
      return books.length;
    }
    // in case of undefined, the default callback is called
    return undefined;
  });
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

    it('should all Crime books be returned.', async () => {
      // given
      const req = mockRequest({ genre: 'Crime' });
      const crimeBooks = mockBooks.filter((book) => book.genre === 'Crime');

      // when
      const controller = bookController();
      const returnedBooks = await controller.getAll(req);

      // then
      expect(returnedBooks).toHaveLength(crimeBooks.length);
      expect(returnedBooks).toContainEqual(
        expect.objectContaining({ id: expect.anything() })
      );
    });
  });

  describe('Get One Book', () => {
    it('should return one book.', async () => {
      // given
      const bookId = 1;
      const mockBook = mockBooks.find((book) => book.id === bookId);

      // when
      const controller = bookController();
      const returnedBook = await controller.getOne(bookId);

      // then
      expect(returnedBook).toMatchObject(mockBook);
    });

    it('should return no book.', async () => {
      // given
      const bookId = 34543564;

      // when
      const controller = bookController();
      const returnedBook = await controller.getOne(bookId);

      // then
      expect(returnedBook).toBeUndefined();
    });
  });

  describe('Create Book', () => {
    it('should return a book with id.', async () => {
      // given
      const book = {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      };

      // when
      const controller = bookController();
      const returnedBook = await controller.create(book);

      // then
      expect(returnedBook).toHaveProperty('id');
      expect(returnedBook.title).toBe(book.title);
    });

    it('Should not allow empty title.', async () => {
      // given
      const book = {
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      };

      // when
      const controller = bookController();
      await expect(controller.create(book))
        // then
        .rejects.toThrow('Title is required');
    });
  });

  describe('Bulk Create Books', () => {
    it('should return books with id.', async () => {
      // given
      const books = [{
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      }, {
        title: 'The Time Machine 2',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      }];

      // when
      const controller = bookController();
      const returnedBooks = await controller.bulkCreate(books);

      // then
      expect(returnedBooks).toHaveLength(books.length);
      expect(returnedBooks).toContainEqual(
        expect.objectContaining({ id: expect.anything() })
      );
    });

    it('Should not allow empty title.', async () => {
      // given
      const books = [{
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      }, {
        title: 'The Time Machine 2',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      }];

      // when
      const controller = bookController();
      await expect(controller.bulkCreate(books))
        // then
        .rejects.toThrow('Title is required');
    });
  });

  describe('Update Book', () => {
    it('should return updated book.', async () => {
      // given
      const bookId = 1;
      const mockBook = mockBooks.find((book) => book.id === bookId);
      const updatedBook = {
        id: bookId,
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: true
      };
      mockBook.update = () => updatedBook;

      // when
      const controller = bookController();
      const returnedBook = await controller.update(mockBook, updatedBook);

      // then
      expect(returnedBook).toMatchObject(updatedBook);
    });

    it('Should not allow empty title.', async () => {
      // given
      const bookId = 1;
      const mockBook = mockBooks.find((book) => book.id === bookId);
      const updatedBook = {
        id: bookId,
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: true
      };

      // when
      const controller = bookController();
      await expect(controller.update(mockBook, updatedBook))
        // then
        .rejects.toThrow('Title is required');
    });
  });

  describe('Patch Book', () => {
    it('should return patched book.', async () => {
      // given
      const bookId = 1;
      const mockBook = mockBooks.find((book) => book.id === bookId);
      const patchedBook = {
        read: true
      };
      const updatedBook = mockBook;
      updatedBook.read = true;
      mockBook.update = () => updatedBook;

      // when
      const controller = bookController();
      const returnedBook = await controller.patch(mockBook, patchedBook);

      // then
      expect(returnedBook).toMatchObject(updatedBook);
    });

    it('id should not be updated.', async () => {
      // given
      // given
      const bookId = 1;
      const mockBook = mockBooks.find((book) => book.id === bookId);
      const patchedBook = {
        id: 3434,
        read: true
      };
      const updatedBook = mockBook;
      updatedBook.read = true;
      mockBook.update = () => updatedBook;

      // when
      const controller = bookController();
      const returnedBook = await controller.patch(mockBook, patchedBook);

      // then
      expect(returnedBook).toMatchObject(updatedBook);
    });
  });

  describe('Delete Book', () => {
    it('should return no book.', async () => {
      // given
      const mockBook = mockBooks[0];
      mockBook.destroy = () => { };

      // when
      const controller = bookController();
      const deletedBook = await controller.remove(mockBook);

      // then
      expect(deletedBook).toBeUndefined();
    });
  });

  describe('Delete All Book', () => {
    it('should return number of deleted books.', async () => {
      // given

      // when
      const controller = bookController();
      const deletedBooks = await controller.removeAll();

      // then
      expect(deletedBooks).toBe(mockBooks.length);
    });
  });
});
