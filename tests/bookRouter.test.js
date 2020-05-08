/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
const dbHandler = require('./db-handler');

// set the ENV environment variable to test
process.env.ENV = 'Test';

const app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

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

describe('Book CRUD Tests:', () => {
  beforeAll(async () => {
    await dbHandler.connect();
  });

  beforeEach(async () => {
    // delete all books
    await Book.deleteMany({}).exec();
    // insert mock books
    await Book.create(mockBooks);
  });

  afterAll(async (done) => {
    await dbHandler.closeDatabase();
    app.server.close(done());
  });

  describe('Get All Books', () => {
    it('should all books be returned.', async () => {
      // given

      // when
      const res = await agent.get('/api/books');

      // then
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(mockBooks.length);
      expect(res.body).toContainEqual(
        expect.objectContaining({ _id: expect.anything() })
      );
    });

    it('should all crime books be returned.', async () => {
      // given

      // when
      const res = await agent.get('/api/books')
        .query({ genre: 'Crime' });

      // then
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(mockBooks.filter((book) => book.genre === 'Crime').length);
      expect(res.body).toContainEqual(
        expect.objectContaining({ _id: expect.anything() })
      );
    });
  });

  describe('Get One Book', () => {
    it('should return one book.', async () => {
      // given
      const { _id } = (await agent.get('/api/books')).body[0];

      // when
      const res = await agent.get(`/api/books/${_id}`);

      // then
      expect(res.status).toBe(200);
      expect(res.body._id).toEqual(_id);
    });

    it('should return no book.', async () => {
      // given
      const bookId = '507f191e810c19729de860ea';

      // when
      const res = await agent.get(`/api/books/${bookId}`);

      // then
      expect(res.status).toBe(404);
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
      const res = await agent.post('/api/books')
        .send(book);

      // then
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
    });

    it('Should not allow empty title.', async () => {
      // given
      const book = {
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      };

      // when
      const res = await agent.post('/api/books')
        .send(book);

      // then
      expect(res.status).toBe(400);
      expect(res.text).toEqual('Title is required');
    });
  });

  describe('Update Book', () => {
    it('should update a book.', async () => {
      // given
      const { _id } = (await agent.get('/api/books')).body[0];
      const book = {
        _id,
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: true
      };

      // when
      const res = await agent.put(`/api/books/${_id}`)
        .send(book);

      // then
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(book);
    });

    it('Should not allow empty title.', async () => {
      // given
      const { _id } = (await agent.get('/api/books')).body[0];
      const book = {
        _id,
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: true
      };

      // when
      const res = await agent.put(`/api/books/${_id}`)
        .send(book);

      // then
      expect(res.status).toBe(400);
      expect(res.text).toEqual('Title is required');
    });

    it('Should update no book.', async () => {
      // given
      const bookId = '507f191e810c19729de860ea';
      const book = {
        bookId,
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
      };

      // when
      const res = await agent.put(`/api/books/${bookId}`)
        .send(book);

      // then
      expect(res.status).toBe(404);
    });
  });

  describe('Patch Book', () => {
    it('should patch a book.', async () => {
      // given
      const { _id } = (await agent.get('/api/books')).body[0];
      const book = {
        read: true
      };

      // when
      const res = await agent.patch(`/api/books/${_id}`)
        .send(book);

      // then
      expect(res.status).toBe(200);
      expect(res.body.read).toBeTruthy();
    });

    it('Should not patch id', async () => {
      // given
      const { _id } = (await agent.get('/api/books')).body[0];
      const book = {
        _id: 'randomid',
        read: true
      };

      // when
      const res = await agent.patch(`/api/books/${_id}`)
        .send(book);

      // then
      expect(res.status).toBe(200);
      expect(res.body.read).toBeTruthy();
      expect(res.body._id).toEqual(_id);
    });

    it('Should patch no book.', async () => {
      // given
      const bookId = '507f191e810c19729de860ea';
      const book = {
        read: true
      };

      // when
      const res = await agent.patch(`/api/books/${bookId}`)
        .send(book);

      // then
      expect(res.status).toBe(404);
    });
  });

  describe('Delete Book', () => {
    it('should delete a book.', async () => {
      // given
      const { _id } = (await agent.get('/api/books')).body[0];

      // when
      const res = await agent.delete(`/api/books/${_id}`);

      // then
      expect(res.status).toBe(204);
    });

    it('Should delete no book.', async () => {
      // given
      const bookId = '507f191e810c19729de860ea';

      // when
      const res = await agent.delete(`/api/books/${bookId}`);

      // then
      expect(res.status).toBe(404);
    });
  });
});
