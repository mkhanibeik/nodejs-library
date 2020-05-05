/* eslint-disable no-undef */
const mockingoose = require('mockingoose').default;
const bookController = require('../controllers/bookController');
const model = require('../models/bookModel');

const mockRequest = (query, body) => ({
  query: { query },
  body
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
      const req = mockRequest();
      const res = mockResponse();

      mockingoose(model).toReturn(mockBooks, 'find');

      const controller = bookController(model);
      const returnedBooks = await controller.getAll(req, res);

      expect(returnedBooks.length).toEqual(mockBooks.length);
    });
  });
});
