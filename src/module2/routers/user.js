import { Router } from 'express';
import { validateSchema } from '../services/validator.js';
import { userSchema } from '../services/schema.js';
import { logger } from '../services/logger.js';
import { HttpCode } from '../constants.js';

export const userRouter = (app, service) => {
  const route = new Router();
  app.use(`/users`, route);

  //Get user by ID
  route.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await service.findUserById(userId);
    if (user === null) {
      const message = `User with id ${userId} not found`;
      res.status(HttpCode.NOT_FOUND).json({ message });
      logger.error(
        `Request: ${req.method} 'users${req.url}'. Message: ${message}`
      );
    } else {
      res.json(user);
    }
  });

  //Add user
  route.post('/', validateSchema(userSchema), async (req, res) => {
    try {
      const createdUser = await service.create(req.body);
      res.status(HttpCode.CREATED).json(createdUser);
    } catch (error) {
      res.status(HttpCode.BAD_REQUEST).json({
        message: error.message,
      });
      logger.error(
        `Request: ${req.method} 'users${req.url}'. Message: ${error.message}`
      );
    }
  });

  //Update user
  route.put('/', validateSchema(userSchema), async (req, res) => {
    try {
      const updatedUser = await service.update(req.body);
      res
        .status(HttpCode.OK)
        .json({ message: `User update status: ${updatedUser}` });
    } catch (error) {
      res.status(HttpCode.BAD_REQUEST).json({
        message: error.message,
      });
      logger.error(
        `Request: ${req.method} 'users${req.url}'. Message: ${error.message}`
      );
    }
  });

  //Get suggest-list - users?filter=<string>&limit=number
  route.get('/', async (req, res) => {
    const { filter, limit } = req.query;
    try {
      const list = await service.getSuggestList(filter, limit);
      res.status(HttpCode.OK).json(list);
    } catch (error) {
      res.status(HttpCode.BAD_REQUEST).json({
        message: error.message,
      });
      logger.error(
        `Request: ${req.method} 'users${req.url}'. Message: ${error.message}`
      );
    }
  });

  // Soft delete user
  route.delete('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
      const deletedUser = await service.delete(userId);
      res.status(HttpCode.OK).json({
        message: `Field isDeleted for User with id ${userId} set as ${deletedUser}`,
      });
    } catch (error) {
      res.status(HttpCode.BAD_REQUEST).json({
        message: error.message,
      });
      logger.error(
        `Request: ${req.method} 'users${req.url}'. Message: ${error.message}`
      );
    }
  });
};
