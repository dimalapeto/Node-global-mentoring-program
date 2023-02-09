import { Router } from 'express';
import { validateSchema } from '../services/validator.js';
import { userSchema } from '../services/schema.js';

export const userRouter = (app, service) => {
  const route = new Router();
  app.use(`/users`, route);

  //Get user by ID
  route.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await service.findUserById(userId);
    if (user === undefined) {
      res.status(404).json({ message: `User with id ${userId} not found` });
    } else {
      res.json(user);
    }
  });

  //Add user
  route.post('/', validateSchema(userSchema), async (req, res) => {
    const createdUser = await service.create(req.body);
    res.status(201).json(createdUser);
  });

  //Update user
  route.put('/', validateSchema(userSchema), async (req, res) => {
    const updatedUser = await service.update(req.body);
    res.status(201).json({ message: `User update status: ${updatedUser}` });
  });

  //Get suggest-list - users?filter=<string>&limit=number
  route.get('/', async (req, res) => {
    const { filter, limit } = req.query;
    const list = await service.getSuggestList(filter, limit);
    res.status(201).json(list);
  });

  // Soft delete user
  route.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await service.delete(userId);
    res.status(201).json({
      message: `Field isDeleted for User with id ${userId} set as ${deletedUser}`,
    });
  });
};
