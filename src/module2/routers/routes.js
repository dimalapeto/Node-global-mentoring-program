import { Router } from 'express';
import { userRouter } from './user.js';
import { groupRouter } from './group.js';
import { sequelize } from '../services/sequelize.js';
import { defineModels } from '../models/defineModels.js';
import UserService from '../data-access/user.js';
import GroupService from '../data-access/group.js';

const app = new Router();

defineModels(sequelize);

(async () => {
  userRouter(app, new UserService(sequelize));
  groupRouter(app, new GroupService(sequelize));
})();

export default app;
