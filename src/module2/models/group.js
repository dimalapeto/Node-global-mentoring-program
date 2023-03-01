import { DataTypes, Model } from 'sequelize';

class Group extends Model {}

export const defineGroup = (sequelize) =>
  Group.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: `Group`,
      tableName: `groups`,
      timestamps: false,
    }
  );
