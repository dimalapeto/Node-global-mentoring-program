import { defineUser } from './user.js';
import { defineGroup } from './group.js';

export const defineModels = (sequelize) => {
  const User = defineUser(sequelize);
  const Group = defineGroup(sequelize);

  User.belongsToMany(Group, { through: 'User_Group' });
  Group.belongsToMany(User, { through: 'User_Group' });
  return { User, Group };
};
