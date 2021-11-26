const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    getSignedJwtToken() {
      const payload = {
        id: this.id,
      };
      return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpire,
      });
    }

    async matchPassword(enteredPasswod) {
      return await bcrypt.compare(enteredPasswod, this.password);
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING(50),
        field: 'user_name',
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
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
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
      sequelize,
      timestamps: true,
      tableName: 'users',
      modelName: 'User',
    }
  );
  return User;
};
