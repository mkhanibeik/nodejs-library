module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('book', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    genre: {
      type: Sequelize.STRING
    },
    read: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('book')
};
