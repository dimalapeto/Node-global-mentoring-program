import { defineUser } from './user.js';
import { defineGroup } from './group.js';

export const defineModels = (sequelize) => {
  const User = defineUser(sequelize);
  const Group = defineGroup(sequelize);
  return { User, Group };
};
