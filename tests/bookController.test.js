/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const mockingoose = require('mockingoose').default;
const bookController = require('../controllers/bookController');
const model = require('../models/bookModel');

const mockRequest = (queryIn, bodyIn) => ({
  query: queryIn || {},
  body: bodyIn
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockResolvedValue(res);
  return res;
};

const mockBooks = [{
  title: 'Claire DeWitt and the City of the Dead',
  author: 'Sara Gran',
  genre: 'Crime',
  read: false
}, {
  title: 'Gone Girl',
  author: 'Gillian Flynn',
  genre: 'Crime',
  read: true,
}, {
  title: 'The Thief',
  author: 'Fuminori Nakamura',
  genre: 'Crime',
  read: false
}, {
  title: 'American Dirt',
  author: 'Jeanine Cummins',
  genre: 'Crime',
  read: false
}, {
  title: 'The Time Machine',
  genre: 'Science Fiction',
  author: 'H. G. Wells',
  read: false
}];

describe('Book Controller Tests:', () => {
  describe('Get All Books', () => {
    it('should all books be returned.', async () => {
      // given
      const req = mockRequest();
      mockingoose(model).toReturn(mockBooks, 'find');

      // when
      const controller = bookController(model);
      const returnedBooks = await controller.getAll(req);

      // then
      expect(returnedBooks).toHaveLength(mockBooks.length);
      expect(returnedBooks).toContainEqual(
        expect.objectContaining({ _id: expect.anything() })
      );
    });

    it('should all Crime books be returned.', async () => {
      // given
      const req = mockRequest({ genre: 'Crime' });
      const crimeBooks = mockBooks.filter((book) => book.genre === 'Crime');
      mockingoose(model).toReturn(crimeBooks, 'find');

      // when
      const controller = bookController(model);
      const returnedBooks = await controller.getAll(req);

      // then
      expect(returnedBooks).toHaveLength(crimeBooks.length);
      expect(returnedBooks).toContainEqual(
        expect.objectContaining({ _id: expect.anything() })
      );
    });
  });

  describe('Get One Book', () => {
    it('should return one book.', async () => {
      // given
      const bookId = '507f191e810c19729de860ea';
      const mockBook = mockBooks[0];
      mockBook._id = bookId;
      mockingoose(model).toReturn(mockBook, 'findOne');

      // when
      const controller = bookController(model);
      const returnedBook = await controller.getOne(bookId);

      // then
      expect(JSON.parse(JSON.stringify(returnedBook))).toMatchObject(mockBook);
    });

    it('should return no book.', async () => {
      // given
      const bookId = '507f191e810c19729de860ea';
      mockingoose(model).toReturn(undefined, 'findOne');

      // when
      const controller = bookController(model);
      const returnedBook = await controller.getOne(bookId);

      // then
      expect(returnedBook).toBeUndefined();
    });
  });

  describe('Create One Book', () => {
    it('should return a book with id.', async () => {
      // given
      const book = {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      };
      mockingoose(model).toReturn(book, 'save');

      // when
      const controller = bookController(model);
      const returnedBook = await controller.create(book);

      // then
      expect(returnedBook).toHaveProperty('_id');
    });

    it('Should not allow empty title.', async () => {
      // given
      const book = {
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      };

      // when
      const controller = bookController(model);
      await expect(controller.create(book))
        // then
        .rejects.toThrow('Title is required');
    });
  });

  describe('Update One Book', () => {
    it('should return updated book.', async () => {
      // given
      const bookId = '507f191e810c19729de860ea';
      const mockBook = mockBooks[0];
      mockBook._id = bookId;
      const updatedBook = {
        _id: bookId,
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: true
      };
      mockingoose(model).toReturn(updatedBook, 'save');

      // when
      const controller = bookController(model);
      const returnedBook = await controller.update(mockBook, updatedBook);

      // then
      expect(JSON.parse(JSON.stringify(returnedBook))).toMatchObject(updatedBook);
    });

    it('Should not allow empty title.', async () => {
      // given
      const bookId = '507f191e810c19729de860ea';
      const mockBook = mockBooks[0];
      mockBook._id = bookId;
      const updatedBook = {
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      };

      // when
      const controller = bookController(model);
      await expect(controller.update(mockBook, updatedBook))
        // then
        .rejects.toThrow('Title is required');
    });
  });

  describe('Patch One Book', () => {
    it('should return patched book.', async () => {
      // given
      const bookId = '507f191e810c19729de860ea';
      const mockBook = mockBooks[0];
      mockBook._id = bookId;
      const patchedBook = {
        read: true
      };
      const updatedBook = mockBook;
      updatedBook.read = true;
      mockingoose(model).toReturn(updatedBook, 'save');

      // when
      const controller = bookController(model);
      const returnedBook = await controller.patch(mockBook, patchedBook);

      // then
      expect(JSON.parse(JSON.stringify(returnedBook))).toMatchObject(updatedBook);
    });

    it('id should not be updated.', async () => {
      // given
      const bookId = '507f191e810c19729de860ea';
      const mockBook = mockBooks[0];
      mockBook._id = bookId;
      const patchedBook = {
        _id: '3243242342342355',
        read: true
      };
      const updatedBook = mockBook;
      updatedBook.read = true;
      mockingoose(model).toReturn(updatedBook, 'save');

      // when
      const controller = bookController(model);
      const returnedBook = await controller.patch(mockBook, patchedBook);

      // then
      expect(JSON.parse(JSON.stringify(returnedBook))).toMatchObject(updatedBook);
    });
  });
});
