module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('products', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          category_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: {
                tableName: 'categories',
              },
              key: 'id',
            },
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING(50),
          },
          description: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          image: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          body: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
