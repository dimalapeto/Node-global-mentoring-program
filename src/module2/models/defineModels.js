import { defineUser } from './user.js';

export const defineModels = (sequelize) => {
  const User = defineUser(sequelize);
  return { User };
};
