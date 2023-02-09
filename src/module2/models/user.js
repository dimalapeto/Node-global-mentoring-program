import { DataTypes, Model } from 'sequelize';

class User extends Model {}

export const defineUser = (sequelize) =>
  User.init(
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: `User`,
      tableName: `users`,
      timestamps: false,
    }
  );
