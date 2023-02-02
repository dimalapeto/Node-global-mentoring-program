import { Router } from 'express';
import { userRouter } from './user.js';
import { sequelize } from '../services/sequelize.js';
import { defineModels } from '../models/defineModels.js';
import UserService from '../data-access/user.js';

const app = new Router();

defineModels(sequelize);

(async () => {
  userRouter(app, new UserService(sequelize));
})();

export default app;
