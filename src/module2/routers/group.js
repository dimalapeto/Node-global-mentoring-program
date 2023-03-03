import { Router } from 'express';
import { validateSchema } from '../services/validator.js';
import { groupSchema } from '../services/schema.js';
import { logger } from '../services/logger.js';
import { HttpCode } from '../constants.js';

export const groupRouter = (app, service) => {
  const route = new Router();
  app.use(`/groups`, route);

  //Get group by ID
  route.get('/:id', async (req, res) => {
    const groupId = req.params.id;
    const group = await service.findGroupById(groupId);
    if (group === null) {
      const message = `Group with id ${groupId} not found`;
      res.status(HttpCode.NOT_FOUND).json({ message });
      logger.error(
        `Request: ${req.method} 'groups${req.url}'. Message: ${message}`
      );
    } else {
      res.json(group);
    }
  });

  //Add group
  route.post('/', validateSchema(groupSchema), async (req, res) => {
    try {
      const createdGroup = await service.create(req.body);
      res.status(HttpCode.CREATED).json(createdGroup);
    } catch (error) {
      res.status(HttpCode.BAD_REQUEST).json({
        message: error.message,
      });
      logger.error(
        `Request: ${req.method} 'groups${req.url}'. Message: ${error.message}`
      );
    }
  });

  //Update group
  route.put('/', validateSchema(groupSchema), async (req, res) => {
    try {
      const updatedGroup = await service.update(req.body);
      res
        .status(HttpCode.OK)
        .json({ message: `Group update status: ${updatedGroup}` });
    } catch (error) {
      res.status(HttpCode.BAD_REQUEST).json({
        message: error.message,
      });
      logger.error(
        `Request: ${req.method} 'groups${req.url}'. Message: ${error.message}`
      );
    }
  });

  //Get all groups
  route.get('/', async (req, res) => {
    try {
      const groups = await service.findAll();
      res.status(HttpCode.OK).json(groups);
    } catch (error) {
      res.status(HttpCode.BAD_REQUEST).json({
        message: error.message,
      });
      logger.error(
        `Request: ${req.method} 'groups${req.url}'. Message: ${error.message}`
      );
    }
  });

  // Hard delete group
  route.delete('/:id', async (req, res) => {
    const groupId = req.params.id;
    const deletedGroup = await service.delete(groupId);
    if (deletedGroup) {
      res
        .status(HttpCode.OK)
        .json({ message: `Group with id ${groupId} deleted` });
    } else {
      const message = `Group with id ${groupId} not deleted`;
      res.status(HttpCode.NOT_FOUND).json({ message });
      logger.error(
        `Request: ${req.method} 'groups${req.url}'. Message: ${message}`
      );
    }
  });

  //add users to group
  route.put('/:id/add-users', async (req, res) => {
    const groupId = req.params.id;
    const updatedGroup = await service.addUsersToGroup(groupId, req.body.users);

    if (updatedGroup.isError) {
      res.status(HttpCode.NOT_FOUND).json({ message: updatedGroup.error });
      logger.error(
        `Request: ${req.method} 'groups${req.url}'. Message: ${updatedGroup.error}`
      );
    } else {
      res
        .status(HttpCode.OK)
        .json({ message: 'Users added to group succesfully' });
    }
  });
};
