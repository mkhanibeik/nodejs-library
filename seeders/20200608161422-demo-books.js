module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('book', [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false,
    created_at: new Date(),
    updated_at: new Date()
  }, {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false,
    created_at: new Date(),
    updated_at: new Date()
  }, {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false,
    created_at: new Date(),
    updated_at: new Date()
  }, {
    title: 'A Journy into the Center of the Earh',
    genre: 'Sicence Fiction',
    author: 'Jules Verne',
    read: false,
    created_at: new Date(),
    updated_at: new Date()
  }, {
    title: 'Claire DeWitt and the City of the Dead',
    author: 'Sara Gran',
    genre: 'Crime',
    read: false,
    created_at: new Date(),
    updated_at: new Date()
  }, {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: 'Crime',
    read: false,
    created_at: new Date(),
    updated_at: new Date()
  }, {
    title: 'The Thief',
    author: 'Fuminori Nakamura',
    genre: 'Crime',
    read: false,
    created_at: new Date(),
    updated_at: new Date()
  }, {
    title: 'American Dirt',
    author: 'Jeanine Cummins',
    genre: 'Crime',
    read: false,
    created_at: new Date(),
    updated_at: new Date()
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('book', null, {})
};
