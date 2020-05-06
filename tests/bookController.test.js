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
      expect(returnedBooks.length).toEqual(mockBooks.length);
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
      expect(returnedBooks.length).toEqual(crimeBooks.length);
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
      expect(returnedBook.__id).toEqual(mockBook.__id);
      expect(returnedBook.title).toEqual(mockBook.title);
      expect(returnedBook.author).toEqual(mockBook.author);
      expect(returnedBook.genre).toEqual(mockBook.genre);
      expect(returnedBook.read).toEqual(mockBook.read);
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
});
