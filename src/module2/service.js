import express from 'express';
import { validateSchema } from './validator.js';
import { userSchema } from './schema.js';
import {
  findUserById,
  createUser,
  updateUser,
  getAutoSuggestUsers,
  deleteUser,
} from './utils.js';

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Get user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = findUserById(userId);
  if (user === undefined) {
    res.status(404).json({ message: `User with id ${userId} not found` });
  } else {
    res.json(user);
  }
});

//Add user
app.post('/users', validateSchema(userSchema), (req, res) => {
  const createdUser = createUser(req.body);
  res.status(201).json(createdUser);
});

//Update user
app.put('/users/:id', validateSchema(userSchema), (req, res) => {
  const updatedUser = updateUser(req.body);
  res.status(201).json(updatedUser);
});

//Get suggest-list - users?filter=<string>&limit=number
app.get('/users', (req, res) => {
  const filter = req.query.filter;
  const limit = req.query.limit;
  const list = getAutoSuggestUsers(filter, limit);
  res.status(201).json(list);
});

// Soft delete user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const deletedUserField = deleteUser(userId);
  res.status(201).json({
    message: `Field isDeleted for User with id ${userId} set as ${deletedUserField}`,
  });
});
