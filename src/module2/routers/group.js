import { Router } from 'express';
import { validateSchema } from '../services/validator.js';
import { groupSchema } from '../services/schema.js';

export const groupRouter = (app, service) => {
  const route = new Router();
  app.use(`/groups`, route);

  //Get group by ID
  route.get('/:id', async (req, res) => {
    const groupId = req.params.id;
    const group = await service.findGroupById(groupId);
    if (group === undefined) {
      res.status(404).json({ message: `Group with id ${groupId} not found` });
    } else {
      res.json(group);
    }
  });

  //Add group
  route.post('/', validateSchema(groupSchema), async (req, res) => {
    const createdGroup = await service.create(req.body);
    res.status(201).json(createdGroup);
  });

  //Update group
  route.put('/', validateSchema(groupSchema), async (req, res) => {
    const updatedGroup = await service.update(req.body);
    res.status(201).json({ message: `Group update status: ${updatedGroup}` });
  });

  //Get all groups
  route.get('/', async (req, res) => {
    const groups = await service.findAll();
    res.status(201).json(groups);
  });

  // Hard delete group
  route.delete('/:id', async (req, res) => {
    const groupId = req.params.id;
    const deletedGroup = await service.delete(groupId);
    if (deletedGroup) {
      res.status(201).json({ message: `Group with id ${groupId} deleted` });
    } else {
      res.status(404).json({ message: `Group with id ${groupId} not deleted` });
    }
  });
};
