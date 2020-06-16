/* eslint-disable global-require */
/* eslint-disable no-undef */
const request = require('supertest');
const mockBooks = require('./mockBooks');
const bookController = require('../controllers/bookController');

const controller = bookController();
const app = require('../app.js');

const agent = request.agent(app);

jest.mock('../models/postgresClient', () => {
  const Seq = require('sequelize');
  const dbClient = new Seq('sqlite::memory:', { logging: false });
  dbClient.sync();
  return dbClient;
});

describe('Book CRUD Tests:', () => {
  beforeEach(async () => {
    // delete all books
    await controller.removeAll();
    // insert mock books
    await controller.bulkCreate(mockBooks);
  });

  afterAll(async done => {
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
        expect.objectContaining({ id: expect.anything() })
      );
    });

    it('should all crime books be returned.', async () => {
      // given

      // when
      const res = await agent.get('/api/books')
        .query({ genre: 'Crime' });

      // then
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(mockBooks.filter(book => book.genre === 'Crime').length);
      expect(res.body).toContainEqual(
        expect.objectContaining({ id: expect.anything() })
      );
    });
  });

  describe('Get One Book', () => {
    it('should return one book.', async () => {
      // given
      const { id } = mockBooks[0];

      // when
      const res = await agent.get(`/api/books/${id}`);

      // then
      expect(res.status).toBe(200);
      expect(res.body.id).toEqual(id);
    });

    it('should return no book.', async () => {
      // given
      const bookId = 12323;

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
      expect(res.body).toHaveProperty('id');
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
      const { id } = mockBooks[0];
      const book = {
        id,
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: true
      };

      // when
      const res = await agent.put(`/api/books/${id}`)
        .send(book);

      // then
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(book);
    });

    it('Should not allow empty title.', async () => {
      // given
      const { id } = mockBooks[0];
      const book = {
        id,
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: true
      };

      // when
      const res = await agent.put(`/api/books/${id}`)
        .send(book);

      // then
      expect(res.status).toBe(400);
      expect(res.text).toEqual('Title is required');
    });

    it('Should update no book.', async () => {
      // given
      const bookId = 123434;
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
      const { id } = mockBooks[0];
      const book = {
        read: true
      };

      // when
      const res = await agent.patch(`/api/books/${id}`)
        .send(book);

      // then
      expect(res.status).toBe(200);
      expect(res.body.read).toBeTruthy();
    });

    it('Should not patch id', async () => {
      // given
      const { id } = mockBooks[0];
      const book = {
        id: 1234,
        read: true
      };

      // when
      const res = await agent.patch(`/api/books/${id}`)
        .send(book);

      // then
      expect(res.status).toBe(200);
      expect(res.body.read).toBeTruthy();
      expect(res.body.id).toEqual(id);
    });

    it('Should patch no book.', async () => {
      // given
      const bookId = 12234;
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
      const { id } = mockBooks[0];

      // when
      const res = await agent.delete(`/api/books/${id}`);

      // then
      expect(res.status).toBe(204);
    });

    it('Should delete no book.', async () => {
      // given
      const bookId = 123344;

      // when
      const res = await agent.delete(`/api/books/${bookId}`);

      // then
      expect(res.status).toBe(404);
    });
  });
});
