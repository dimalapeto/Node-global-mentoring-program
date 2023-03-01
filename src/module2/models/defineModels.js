import { defineUser } from './user.js';
import { defineGroup } from './group.js';

export const defineModels = (sequelize) => {
  const User = defineUser(sequelize);
  const Group = defineGroup(sequelize);

  const User_Group = sequelize.define('User_Group', {}, { timestamps: false });
  User.belongsToMany(Group, {
    through: User_Group,
    as: 'groups',
    onDelete: 'CASCADE',
  });
  Group.belongsToMany(User, {
    through: User_Group,
    as: 'users',
    onDelete: 'CASCADE',
  });

  return { User, Group };
};
