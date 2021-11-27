const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        onDelete: 'SET NULL',
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING(50),
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
      tableName: 'categories',
      modelName: 'Category',
    }
  );
  return Category;
};
