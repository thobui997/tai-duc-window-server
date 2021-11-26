const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  Product.init(
    {
      categoryId: {
        type: DataTypes.UUID,
        field: 'category_id',
      },
      title: DataTypes.STRING(50),
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      body: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: 'products',
      modelName: 'Product',
    }
  );
  return Product;
};
